import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MovieService } from '../sevices/movies';
import * as fromRoot from '../reducers';
import * as movie from '../actions/movie';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class MovieListGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private movieService: MovieService,
    private router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getCollectionLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  hasMovieInStore(id: string): Observable<boolean> {
    return this.store.select(fromRoot.getMovieEntities)
      .map(entities => !!entities[id])
      .take(1);
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasMovieInApi(id: string): Observable<boolean> {
    return this.movieService.retrieveMovie(id)
      .map(movieEntity => new movie.LoadAction(movieEntity))
      .do((action: movie.LoadAction) => this.store.dispatch(action))
      .map(book => !!book)
      .catch(() => {
        this.router.navigate(['/404']);
        return of(false);
      });
  }

  /**
   * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  hasMovie(id: string): Observable<boolean> {
    return this.hasMovieInStore(id)
      .switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasMovieInApi(id);
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad()
      .switchMap(() => this.hasMovie(route.params['id']));
  }
}
