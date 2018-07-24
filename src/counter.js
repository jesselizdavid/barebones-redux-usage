const minValue = -5;
const maxValue = 5;

const counterOutput = document.querySelector(".Counter-output");


const counterDecrement = document.querySelector(".Counter-decrement");
// counterDecrement.addEventListener("click", () => {
//   const currentValue = Number(counterOutput.value);
//   const value = Math.max(minValue, currentValue - 1);

//   counterOutput.value = value;
// });

counterDecrement.addEventListener("click", () => {
  store.dispatch({ type: DECREMENT_ACTION});
})


const counterIncrement = document.querySelector(".Counter-increment");
// counterIncrement.addEventListener("click", () => {
//   const currentValue = Number(counterOutput.value);
//   const value = Math.min(maxValue, currentValue + 1);

//   counterOutput.value = value;
// });

counterIncrement.addEventListener("click", () => {
  store.dispatch({ type: INCREMENT_ACTION });
})

// Initial state
const INITIAL_COUNTER_STATE = {
  count: 0, 

}

// Reducer
const counterReducer = (state = INITIAL_COUNTER_STATE, action) => {
  switch(action.type) {
    case INCREMENT_ACTION: {
      return {
        ...state,
        count: state.count + 1,
      }
    }
    case DECREMENT_ACTION: {
      return {
        ...state,
        count: state.count - 1
      }
    }
    case RESET_ACTION: {
      return {
        ...INITIAL_COUNTER_STATE,
      }
    }
    default: {
      return state;
    }
  }
}
// Actions types
const INCREMENT_ACTION = 'INCREMENT';
const DECREMENT_ACTION = 'DECREMENT';
const RESET_ACTION = 'RESET';

// Redux store
const store = Redux.createStore(counterReducer);

store.dispatch({ type: INCREMENT_ACTION });
store.subscribe(() => {
  const state = store.getState();
  counterOutput.value = state.count;
});

console.log(store.getState());

