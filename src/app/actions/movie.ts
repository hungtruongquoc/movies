import {Action} from "@ngrx/store";

export const INITIAL_MOVIES = {};

export class MovieStateActions {
  static LOAD_MOVIES = '[Movies] Load Movie List';
  loadMovieList(): Action {
    return {
      type: MovieStateActions.LOAD_MOVIES
    }
  }
  static LOAD_MOVIES_SUCCESS = '[Movies] Load Movie List Success';
  loadMovieListSuccess(movies): Action {
    console.log(MovieStateActions.LOAD_MOVIES_SUCCESS + ' executed');
    console.log(movies);
    return {
      type: MovieStateActions.LOAD_MOVIES_SUCCESS,
      payload: movies
    }
  }
}
