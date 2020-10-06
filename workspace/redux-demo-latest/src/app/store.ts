import { INCREMENT } from './actions';
import { tassign } from 'tassign';
import { Map } from 'immutable';

/**
 * this interface so this interface will determine what properties we're going to have in our store.
 */
export interface IAppState {
  counter: number;
}

export const INITIAL_STATE: IAppState = {
  counter: 0,
};

/**
 * we start with one reducer function here and as our application grows,
 * we can break down this function into smaller more maintainable functions
 * each focusing on one domain in the application.
 */
export function rootReducer(state: Map<string, any>, action): Map<string, any> {
  switch (action.type) {
    case INCREMENT:
      //return { counter: state.counter + 1 }; // returning a new state
      //return Object.assign({}, state, { counter: state.counter + 1 }); // to avoid typing all properties of the state
      //return tassign(state, { counter: state.counter + 1 }); // typesafe versiob of Object.assign()
      return state.set('counter', state.get('counter') + 1);
  }
  return state;
}
