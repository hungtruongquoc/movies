/**
 * Created by hungtruong on 4/27/17.
 */
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import {Injectable} from '@angular/core';
import {Effect, Actions, toPayload} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {empty} from 'rxjs/observable/empty';
import {of} from 'rxjs/observable/of';

import {MovieService} from '../sevices/movies';
import {MovieStateActions} from '../actions/movie';
import {map} from "rxjs/operator/map";


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class MovieEffects {

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(MovieStateActions.LOAD_MOVIES)
    .map(action => action.payload)
    .switchMap((query) => {
      return this.movies.searchMovies(query.page, query.currentSearchText);
    })
    .map(movies => this.movieAction.loadMovieListSuccess(movies))
    .catch(() => of(this.movieAction.loadMovieListSuccess([])));

  @Effect()
  detail$: Observable<Action> = this.actions$.ofType(MovieStateActions.LOAD_MOVIE)
    .map(action => action.payload)
    .switchMap((movieId) => this.movies.retrieveMovie(movieId))
    .map(movie => this.movieAction.loadMovieSuccess(movie))
    .catch(() => of(this.movieAction.loadMovieSuccess(null)));

  constructor(private actions$: Actions, private movieAction: MovieStateActions, private movies: MovieService) {
  }
}
