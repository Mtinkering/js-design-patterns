Receiver: hold business logic. When given a command, it knows how to fulfill that request
- is also the manager
- is also the reducer

// Receiver:
const TeslaSalesControl = {
  buyVehicle,
  requestInfo,
  arrangeViewing
}

export default TeslaSalesControl;

// The command object
const sampleCommand = {
  action: "arrangeViewing",
  params: ['Tesla 3', '1337']
};

// The executor
- command to the receiver and call our business logic.

1. We need an object
2. That object has a set of methods
3. It wishes to invoke them
4. But not directly, through command objects => 
hence encapsulation the invocation of a method

Command Objects:
/*
  var EnableAlarm = function (alarm) {
    this.alarm = alarm;
  }
  EnableAlarm.prototype.execute = function () {
    this.alarm.enable();
  }
  var DisableAlarm = function (alarm) {
    this.alarm = alarm;
  }
  DisableAlarm.prototype.execute = function () {
    this.alarm.disable();
  }
  var ResetAlarm = function (alarm) {
    this.alarm = alarm;
  }
  ResetAlarm.prototype.execute = function () {
    this.alarm.reset();
  }
  var SetAlarm = function (alarm) {
    this.alarm = alarm;
  }
  SetAlarm.prototype.execute = function () {
    this.alarm.set();
  }
*/

var alarms = [/* array of alarms */],
  i = 0, len = alarms.length;

// The Client: the code that creates the command object 
// and passes it on to the invoker
for (; i < len; i++) {
  var enable_alarm = new EnableAlarm(alarms[i]),
    disable_alarm = new DisableAlarm(alarms[i]),
    reset_alarm = new ResetAlarm(alarms[i]),
    set_alarm = new SetAlarm(alarms[i]);
  new Button('enable', enable_alarm);
  new Button('disable', disable_alarm);
  new Button('reset', reset_alarm);
  new Button('set', set_alarm);
}

// The invoker is the object that utilizes the command object and calls its method(s)
// ?

// the receiver is the object that the command is making calls on, 
// which in this case are the Alarms


- What is a command object: 
The pattern components:
- Client: 
- Receiver:
- Command:
- Invoker: 

// Example 2:
// actions:
function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

// Each operation is encapsulated by a Command object.
var Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
}

var AddCommand = function (value) {
  return new Command(add, sub, value);
};

var SubCommand = function (value) {
  return new Command(sub, add, value);
};

var MulCommand = function (value) {
  return new Command(mul, div, value);
};

var DivCommand = function (value) {
  return new Command(div, mul, value);
};

// 
var Calculator = function () {
  var current = 0;
  var commands = [];

  function action(command) {
    var name = command.execute.toString().substr(9, 3);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      log.add(action(command) + ": " + command.value);
    },

    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      log.add("Undo " + action(command) + ": " + command.value);
    },

    getCurrentValue: function () {
      return current;
    }
  }
}

// log helper

var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { alert(log); log = ""; }
  }
})();

//
function run() {
  var calculator = new Calculator();

  // issue commands instead of directly accessing them

  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MulCommand(6));
  calculator.execute(new DivCommand(2));

  // reverse last two commands

  calculator.undo();
  calculator.undo();

  log.add("\nValue: " + calculator.getCurrentValue());
  log.show();
}


//Example 1:
// Example carManager. Hey Manager, do this, do that.
var carManager = {

  // request information
  requestInfo: function (model, id) {
    return "The information for " + model + " with ID " + id + " is foobar";
  },

  // purchase the car
  buyVehicle: function (model, id) {
    return "You have successfully purchased Item " + id + ", a " + model;
  },

  // arrange a viewing
  arrangeViewing: function (model, id) {
    return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
  }

};

// It's okay to call the methods directly
// But what if we want to change API of carManager -> all objects directly
// access those methods need to be updated => not loosely coupled
// => we should abstract the API layer away
// Instead of carManager.requestInfo()  => use carManager.execute()

// Example of execute function
carManager.execute = function (name) {
  return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

carManager.execute("arrangeViewing", "Ferrari", "14523");
carManager.execute("requestInfo", "Ford Mondeo", "54323");
carManager.execute("requestInfo", "Ford Escort", "34232");
carManager.execute("buyVehicle", "Ford Escort", "34232");

// Example 2:
