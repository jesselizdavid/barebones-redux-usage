// Do not use this in production.
// It avoids doing things like running randomized actions at startup
// and erroring, if reducers don't return values for undefined state
// but this type of behaviour doesn't make much sense in a demonstration of "why"
function combineReducers (reducerMap) {
  return function (currentState, action) {
    const newState = {};

    // `reducerMap[key]` is a reducer; set `state[key]` to the value that comes out
    // transforms `{ counter: counterReducer }` to `{ counter: 0 }` for example
    const updateStateKey = (state, key) => {
      state[key] = reducerMap[key](currentState, action);
      return state;
    };

    // grab keys off of the object, and for each key, append its reducer's output
    return Object.keys(reducerMap).reduce(updateStateKey, newState);
  };
}
