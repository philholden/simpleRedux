export default function SimpleRedux(actions, reducers, defaultState) {

  let keys = Object.keys(actions);
  let reducerNames = {};
  let actionCreators = {};
  let constants = {};

  function toCammelCase(key) {
    return key.toLowerCase()
      .replace(/_\w/g, c => c[1].toUpperCase());
  }

  function cammelize(key, i) {
    reducerNames[key] = toCammelCase(keys[i]);
  }

  keys.forEach(cammelize);

  keys.forEach(function(key) {
    constants[key] = key;

    let actionObj = {
      type: key
    };

    actionCreators[reducerNames[key]] = function(...args) {
      actions[key].forEach((arg, i) => {
        actionObj[arg] = args[i];
      });
      return actionObj;
    };
  });

  function reducer (state, action) {
    if (state === undefined) state = defaultState;
    if (!actions[action.type]) return state;
    let reducerName = reducerNames[action.type];
    let actionReducer = reducers[reducerName];
    if (!actionReducer) {
      console.warn(`action '${toCammelCase(action.type)}' with type '${action.type}' exists but reducer '${reducerName}' does not`);
    }
    return actionReducer(state, action);
  }

  return {
    constants,
    actionCreators,
    reducer
  };
}
