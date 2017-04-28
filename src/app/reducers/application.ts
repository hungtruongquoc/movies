import {IAppConfiguration} from "../common/Types";
import {AppStateActions, INITIAL_STATE} from "../actions/application";
import {Action} from "@ngrx/store";

export function applicationState(state: IAppConfiguration = INITIAL_STATE, action: Action) {
  switch(action.type) {
    case AppStateActions.LOAD_CONFIGURATION_SUCCESS:
      console.log('Reducer applicationState is executed with action ', action.type);
      let newState = Object.assign({}, state);
      newState.config = action.payload;
      newState.isLoadingConfig = newState.config === null;
      console.log('New application state: ', newState);
      return newState;
    default:
      return state;
  }
}
