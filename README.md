# simpleRedux

* reduce boilerplate for Redux reducers with dumb actions
* create `actionCreators`, `constants` and `reducers` in a single file
* actionCreator names are derived by `camelCasing` the `CONSTANT_CASE` names

example:

```javascript
import simpleRedux from 'simpleRedux';

const actions = {
  'INCREMENT': ['step'],
  'DECREMENT': ['step']
};

const reducers = {
  increment(state, action) {
    return state + action.step;
  },

  decrement(state, action) {
    return state - action.step;
  }
};

let counter = simpleRedux(actions, reducers, 5);
```

`counter` is now equivalent to the following code:

```javascript
counter = {

  actionCreators:{
    increment(step) {
      type: 'INCREMENT',
      step
    },
    decrement(step) {
      type: 'DECREMENT',
      step
    }
  },

  constants:{
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT'
  },

  reducer: function(state = 5, action)
    switch(action.type) {
      case 'INCREMENT':
        return state + action.step;
      case 'DECREMENT':
        return state - action.step;
      default:
        return state;
    }
  }
}
```

