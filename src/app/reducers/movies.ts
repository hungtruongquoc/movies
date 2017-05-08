import {INITIAL_MOVIES, MovieStateActions} from "../actions/movie";
import {Action} from "@ngrx/store";

export function movieState(state: any = INITIAL_MOVIES , action: Action){
  console.log('Reducer movieState is executed with action ', action.type);
  console.log('Payload is ', action.payload);
  switch(action.type) {
    case MovieStateActions.LOAD_MOVIES:
      return Object.assign({}, state, action.payload);
    case MovieStateActions.LOAD_MOVIES_SUCCESS:
      return Object.assign({}, state, action.payload);
    case MovieStateActions.LOAD_MOVIE:
      if(state.hasOwnProperty('movieDetails') && state.movieDetails.hasOwnProperty(action.payload)){
        action.payload = {loadedMovie: state.movieDetails[action.payload]}
      }
      return state;
    case MovieStateActions.LOAD_MOVIE_SUCCESS:
      let newState = Object.assign({}, state);
      if(!newState.hasOwnProperty('movieDetails')) {
        newState.movieDetails = {};
      }
      newState.movieDetails[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
