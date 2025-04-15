export function parseSearch(search: string) {
  let isSpacingCode = false;
  const searchParam = {
    prefix: "",
    param: "",
  };

  for (const char of search) {
    if (char === " " && searchParam.prefix && !isSpacingCode) {
      isSpacingCode = true;
    } else if (!isSpacingCode) {
      searchParam.prefix += char;
    } else {
      searchParam.param += char;
    }
  }

  return searchParam;
}
