/**
 * Convert standard notation into Reverse Polish Notation
 * ```
 * TODO: This is ChatGPT code!
 * ```
 *
 * @param expression Standard notation expression
 * @returns An array of Reverse Polish Notation
 */
export function parserRPN(expression: string): string[] {
  const outputQueue: string[] = [];
  const operatorStack: string[] = [];
  const functionArgCount: Record<string, number> = {};

  const precedence: Record<string, number> = {
    "+": 2,
    "-": 2,
    "*": 3,
    "/": 3,
    "^": 4,
  };

  const associativity: Record<string, "left" | "right"> = {
    "+": "left",
    "-": "left",
    "*": "left",
    "/": "left",
    "^": "right",
  };

  const constants = new Set(["pi", "e"]);
  const isOperator = (token: string) => "+-*/^".includes(token);
  const isNumeric = (token: string) => /^[0-9.]+$/.test(token);
  const isFunction = (token: string) =>
    /^[a-zA-Z]+$/.test(token) && !constants.has(token);

  const tokens = expression.match(/([a-zA-Z]+|\d+(\.\d+)?|[\+\-\*\/\^\(\),])/g);
  if (!tokens) throw new Error("Invalid expression");

  let prevToken: string | null = null;

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i];

    // Detect unary minus
    if (
      token === "-" &&
      (prevToken === null ||
        isOperator(prevToken) ||
        prevToken === "(" ||
        prevToken === ",")
    ) {
      token = "neg"; // Treat unary minus as a function: neg(x)
    }

    if (isNumeric(token) || constants.has(token)) {
      outputQueue.push(token);
    } else if (isFunction(token) || token === "neg") {
      operatorStack.push(token);
      functionArgCount[token] = 1;
    } else if (token === ",") {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (!operatorStack.length) {
        throw new Error("Misplaced comma or mismatched parentheses");
      }

      // Count function arguments
      for (let j = operatorStack.length - 1; j >= 0; j--) {
        const func = operatorStack[j];
        if (isFunction(func)) {
          functionArgCount[func]++;
          break;
        }
      }
    } else if (isOperator(token)) {
      while (
        operatorStack.length &&
        isOperator(operatorStack[operatorStack.length - 1]) &&
        ((associativity[token] === "left" &&
          precedence[token] <=
            precedence[operatorStack[operatorStack.length - 1]]) ||
          (associativity[token] === "right" &&
            precedence[token] <
              precedence[operatorStack[operatorStack.length - 1]]))
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      operatorStack.push(token);
    } else if (token === "(") {
      operatorStack.push(token);
    } else if (token === ")") {
      while (
        operatorStack.length &&
        operatorStack[operatorStack.length - 1] !== "("
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
      if (!operatorStack.length) throw new Error("Mismatched parentheses");
      operatorStack.pop(); // Remove "("

      // If function is on top of stack, pop and push it to output
      if (
        operatorStack.length &&
        (isFunction(operatorStack[operatorStack.length - 1]) ||
          operatorStack[operatorStack.length - 1] === "neg")
      ) {
        outputQueue.push(operatorStack.pop()!);
      }
    }

    prevToken = token;
  }

  while (operatorStack.length) {
    const op = operatorStack.pop()!;
    if (op === "(" || op === ")") throw new Error("Mismatched parentheses");
    outputQueue.push(op);
  }

  return outputQueue;
}

/**
 * Evaluate a Reverse Polish Expression.
 * ```
 * TODO: This is ChatGPT code!
 * ```
 *
 * @param rpnTokens Tokens of Reverse Polish Notations
 * @returns Evaliation result
 */
export function evaluateRPN(rpnTokens: string[]): number {
  const stack: number[] = [];

  const constants: Record<string, number> = {
    pi: Math.PI,
    e: Math.E,
  };

  const operators: Record<string, (a: number, b: number) => number> = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    "^": (a, b) => Math.pow(a, b),
  };

  const functions: Record<string, (...args: number[]) => number> = {
    sin: (x) => Math.sin(x),
    cos: (x) => Math.cos(x),
    log: (x) => Math.log10(x),
    ln: (x) => Math.log(x),
    abs: (x) => Math.abs(x),
    sqrt: (x) => Math.sqrt(x),
    max: (...args) => Math.max(...args),
    min: (...args) => Math.min(...args),
    neg: (x) => -x,
  };

  const arity: Record<string, number> = {
    sin: 1,
    cos: 1,
    log: 1,
    ln: 1,
    abs: 1,
    sqrt: 1,
    neg: 1,
    max: 2,
    min: 2,
  };

  for (const token of rpnTokens) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else if (token in constants) {
      stack.push(constants[token]);
    } else if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined)
        throw new Error("Insufficient values");
      stack.push(operators[token](a, b));
    } else if (token in functions) {
      const argCount = arity[token] ?? 1;
      const args = stack.splice(-argCount);
      if (args.length !== argCount)
        throw new Error(`Function ${token} expects ${argCount} args`);
      stack.push(functions[token](...args));
    } else {
      throw new Error(`Unknown token: ${token}`);
    }
  }

  if (stack.length !== 1) throw new Error("Invalid RPN expression");
  return stack[0];
}
