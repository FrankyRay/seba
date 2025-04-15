import type { Plugin } from "$lib/interfaces/Plugins";
import { parserRPN, evaluateRPN } from "./scripts/reversePolishNotaion";

type MathRegex = {
  [key: string]: RegExp;
};

// === Plugin Setting
type ParseSearch = {
  value: number;
  from: string;
  to: string;
};

export const plugin: Plugin = {
  id: "calculator",
  name: "Calculator",
  prefix: "=",
  execute,
  restart() {},
};

export let data = $state({
  result: "0",
  error: "",
});

function execute(args: string) {
  try {
    const RPN = parserRPN(args);
    data.error = "[ " + RPN.join(", ") + " ]";
    data.result = String(evaluateRPN(RPN));
  } catch (error) {
    data.error = "[ERR] " + error;
  }

  // Normal arithmetic operator
  // for (const [key, val] of Object.entries(arithmeticRegex)) {
  //   while (true) {
  //     const eq = val.regex.exec(equation);
  //     if (eq === null) break;

  //     const a = Number(eq[1]);
  //     const b = Number(eq[3]);
  //     equation = equation.replace(val.regex, String(val.fn(a, eq[2], b)));
  //   }
  // }

  // const num = Number(equation);
  // if (isNaN(num)) return (data.error += "Error parsing equations!");
  // data.result = num.toLocaleString("id-ID");
}
