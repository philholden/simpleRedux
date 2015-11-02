import simpleRedux from '../src/index.js';
import expect from 'expect';

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


describe('counter', () => {
  let counter;
  beforeEach(() => {
    counter = simpleRedux(actions, reducers, 5);
  });

  it('should create action creators', () => {
    expect(counter.actionCreators.increment(1)).toEqual({
      type: 'INCREMENT',
      step: 1
    });

    expect(counter.actionCreators.decrement(2)).toEqual({
      type: 'DECREMENT',
      step: 2
    });
  });

  it('should create key mirror style constants', () => {
    expect(counter.constants).toEqual({
      DECREMENT: 'DECREMENT',
      INCREMENT: 'INCREMENT'
    });
  });

  it('should create reducer from an object made of reducer functions keyed by camelcase action type', () => {
    expect(counter.reducer(1, {
      type: 'INCREMENT',
      step: 1
    })).toEqual(2);
  });

  it('should use defaultState if state is undefined', () => {
    expect(counter.reducer(undefined, {
      type: 'DECREMENT',
      step: 1
    })).toEqual(4);
  });

});


