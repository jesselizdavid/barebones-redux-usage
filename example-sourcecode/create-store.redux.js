// Don't use this in production.
// It's meant to be a look at why Redux works,
// not to match it in performance, or in exact behaviour
// it also skips all of the middleware, et cetera
function createStore(initialReducer, initialState) {
  if (!initialReducer) {
    throw new Error("createStore needs a reducer function");
  }

  // the function that will be called with state and action
  let currentReducer = initialReducer;
  // the state of the store
  let currentState = initialState || undefined;
  // the subscribers to changes in state
  let listeners = [];
  // a flag to know if I am already inside a reducer (prevents infinite loops)
  let isAlreadyWorking = false;

  const getState = () => state;

  // dispatch(action)
  // - calls the reducer with state and action
  // - replaces the current state with the return value
  // - returns the action that was given
  // - throws an error if you try to dispatch while already updating
  // - notifies all subscribers that were subscribed before dispatch was called
  const dispatch = action => {
    if (isAlreadyWorking) {
      throw new Error("Trying to dispatch while already dispatching");
    }
    // we need to do work
    isAlreadyWorking = true;
    // get the listeners before dispatch was called
    // (in case subscriptions happen during dispatch)
    const currentListeners = listeners.slice();
    // get the new state by running the reducer
    const state = currentReducer(currentState, action);
    // overwrite the old state
    currentState = state;
    // notify all of the current subscribers
    currentListeners.forEach(update => update(currentState));
    // we're done updating
    isAlreadyWorking = false;
    return action;
  };

  // add a new listener to the list
  const subscribe = onUpdate => listeners.push(onUpdate);
  // remove a listener from the list
  const unsubscribe = onUpdate =>
    listeners.splice(listeners.indexOf(onUpdate), 1);

  // replace the reducer function with a new one
  // can be useful for adding components after the app has started
  const replaceReducer = newReducer => {
    if (!newReducer) {
      throw new Error("replaceReducer needs a reducer function");
    }
    currentReducer = newReducer;
  };

  // this is the interface that you see in apps
  const store = {
    getState,
    dispatch,
    subscribe,
    unsubscribe,
    replaceReducer
  };

  return store;
}
