"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SimpleRedux;

function SimpleRedux(actions, reducers, defaultState) {

  var keys = Object.keys(actions);
  var reducerNames = {};
  var actionCreators = {};
  var constants = {};

  function toCammelCase(key) {
    return key.toLowerCase().replace(/_\w/g, function (c) {
      return c[1].toUpperCase();
    });
  }

  function cammelize(key, i) {
    reducerNames[key] = toCammelCase(keys[i]);
  }

  keys.forEach(cammelize);

  keys.forEach(function (key) {
    constants[key] = key;

    var actionObj = {
      type: key
    };

    actionCreators[reducerNames[key]] = function () {
      var args = arguments;
      actions[key].forEach(function (arg, i) {
        actionObj[arg] = args[i];
      });
      return actionObj;
    };
  });

  function reducer(state, action) {
    if (state === undefined) state = defaultState;
    if (!actions[action.type]) return state;
    var reducerName = reducerNames[action.type];
    var actionReducer = reducers[reducerName];
    if (!actionReducer) {
      console.warn("action '" + toCammelCase(action.type) + "' with type '" + action.type + "' exists but reducer '" + reducerName + "' does not");
    }
    return actionReducer(state, action);
  }

  return {
    constants: constants,
    actionCreators: actionCreators,
    reducer: reducer
  };
}

module.exports = exports["default"];