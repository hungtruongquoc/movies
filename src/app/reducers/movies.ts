import {INITIAL_MOVIES, MovieStateActions} from "../actions/movie";
import {Action} from "@ngrx/store";

export function movieState(state: any = INITIAL_MOVIES , action: Action){
  switch(action.type) {
    case MovieStateActions.LOAD_MOVIES_SUCCESS:
      console.log('Reducer movieState is executed with action ', action.type);
      console.log('Payload is ', action.payload);
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
