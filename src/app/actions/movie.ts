import {Action} from "@ngrx/store";

export const INITIAL_MOVIES = {};

export class MovieStateActions {
  static LOAD_MOVIES = '[Movies] Load Movie List';
  loadMovieList(): Action {
    return {
      type: MovieStateActions.LOAD_MOVIES
    }
  }
  static LOAD_MOVIES_SUCCESS = '[Movies] Load Movie List';
  loadMovieListSuccess(movies): Action {
    return {
      type: MovieStateActions.LOAD_MOVIES_SUCCESS,
      payload: movies
    }
  }
}
