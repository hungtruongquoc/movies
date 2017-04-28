import {Action} from "@ngrx/store";

export const INITIAL_STATE = { isLoadingConfig: false, config: null};

export class AppStateActions {
  static LOAD_CONFIGURATION = '[Configuration] Load Configuration Items';
  loadConfiguration(): Action {
    return {
      type: AppStateActions.LOAD_CONFIGURATION
    }
  }
  static LOAD_CONFIGURATION_SUCCESS = '[Configuration] Load Configuration Success';
  loadConfigurationSuccess(configuration): Action {
    console.log('Action LoadConfigurationSuccess is executed');
    return {
      type: AppStateActions.LOAD_CONFIGURATION_SUCCESS,
      payload: configuration
    }
  }
}
