import { Action } from 'redux';
import { CounterActions } from './app.actions';

export interface IAppState {
  count: number;
  apiKey: string;
}

export const INITIAL_STATE: IAppState = {
  count: 0,
  apiKey: '207ed00a90c04ead5e36ce131acb23ca'
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  switch(action.type) {
    case CounterActions.INCREMENT:
      return{
        count: lastState.count + 1,
        apiKey: lastState.apiKey
      };
    case CounterActions.DECREMENT: return {
      count: lastState.count - 1,
      apiKey: lastState.apiKey
    };
  }

  // We don't care about any other actions right now.
  return lastState;
}
