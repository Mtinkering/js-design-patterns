// Problem: we have a calculator and it's okay to call its methods directly

// Favor changes: But what if we want to change API of the calculator -> all objects directly
// access those methods need to be updated => not loosely coupled
// => we should abstract the API layer away

/*
 * The receiver
*/
const calculator = {
  _add(x, y) { return x + y },
  _sub(x, y) { return x - y },
  _mul(x, y) { return x * y },
  _div(x, y) { return x / y },

  // Invoker: trigger the execution on the command
  execute(name) {
    const method = `_${name}`;
    return this[name] && this[name].apply(this, [].slice.call(arguments, 1));
  }
}

// Client
function run() {
  /*
  * The command object
  */
  const sampleCommand = {
    action: "add",
    params: ['1', '2']
  };
  calculator.execute(sampleCommand);
}

run();

// Think of this pattern a bit as Redux.
// Store - Reducer - Action - Dispatch