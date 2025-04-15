import type { Plugin } from "$lib/interfaces/Plugins";
import exchangeRate from "./data/exchangeRate";

// === Plugin Setting
type ParseSearch = {
  value: number;
  from: string;
  to: string;
};

export const plugin: Plugin = {
  id: "calc-exchange",
  name: "Calculator Exchange",
  prefix: "=$",
  info: {
    icon: "update",
    text: new Date(exchangeRate.lastupdate).toLocaleString("id-ID", {
      timeZone: "Asia/Jakarta",
      hourCycle: "h12",
    }),
  },
  execute,
  restart() {},
};

export let data = $state({
  exchange: "$0",
  description: "",
  error: "",
});

// === Functions
function isValidCurrency(currency: string) {
  return currency in exchangeRate.rates;
}

function getExchangeRate(from: string, to: string) {
  return exchangeRate.rates[to] / exchangeRate.rates[from];
}

function exchangeLocaleString(
  value: number,
  currency: string,
  locale: Intl.LocalesArgument = "en-US"
) {
  return value.toLocaleString(locale, {
    style: "currency",
    currencyDisplay: "symbol",
    currency,
  });
}

function parseSearch(search: string) {
  const parse: ParseSearch = { value: 0, from: "USD", to: "USD" };
  const args = search.split(" ");

  let parseValue = false;
  for (let position = 0; position < args.length; position++) {
    const arg = args[position].toUpperCase();
    if (!arg) break;

    if (position === 0) {
      if (!isValidCurrency(arg))
        throw new Error(
          `Error parsing search: '${arg}' is not a valid currency code!`
        );
      parse.to = arg;
    } else if (position === 1) {
      const num = Number(arg);
      if (isNaN(num)) {
        if (!isValidCurrency(arg))
          throw new Error(
            `Error parsing search: '${arg}' is not a valid currency code!`
          );

        parse.from = parse.to;
        parse.to = arg;
      } else {
        parse.value = num;
        parseValue = true;
      }
    } else if (position === 2 && !parseValue) {
      const num = Number(arg);
      if (isNaN(num))
        throw new Error(
          `Error parsing search: '${arg}' is not a valid number!`
        );

      parse.value = num;
      parseValue = true;
    } else
      throw new Error(`Error parsing search: Too many arguments specified!`);
  }

  return parse;
}

function execute(args: string) {
  let parse;
  try {
    parse = parseSearch(args);
  } catch (e) {
    data.error = e as string;
    return;
  }

  const rate = getExchangeRate(parse.from, parse.to);
  const value = rate * parse.value;

  data.exchange = exchangeLocaleString(value, parse.to, "id-ID");
  data.description = `${exchangeLocaleString(1, parse.from, "id-ID")} (${
    parse.from
  }) = ${exchangeLocaleString(rate, parse.to, "id-ID")} (${parse.to})`;
}
