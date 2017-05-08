import {Action} from "@ngrx/store";

export const INITIAL_MOVIES = {};

export class MovieStateActions {
  static LOAD_MOVIES = '[Movies] Load Movie List';
  loadMovieList(newPage = 1, searchText = null): Action {
    return {
      type: MovieStateActions.LOAD_MOVIES,
      payload: {page: newPage, currentSearchText: searchText}
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
  static LOAD_MOVIE = '[Movie] Load detail of movie';
  loadMovie(movieId) : Action {
    console.log(MovieStateActions.LOAD_MOVIE, ' executed with id', movieId);
    return {
      type: MovieStateActions.LOAD_MOVIE,
      payload: movieId
    }
  }
  static LOAD_MOVIE_SUCCESS = '[Movie] Load detail of movie success';
  loadMovieSuccess(movieDetail) : Action {
    console.log(MovieStateActions.LOAD_MOVIE_SUCCESS, ' executed with detail', movieDetail);
    return {
      type: MovieStateActions.LOAD_MOVIE_SUCCESS,
      payload: movieDetail
    }
  }
}
