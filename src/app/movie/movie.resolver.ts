/**
 * Created by hungtruong on 5/7/17.
 */
import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import { Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';
import {MovieStateActions} from "../actions/movie";
import {Observable} from "rxjs/Observable";
import {IMovieDetail, IMovieSearchResult} from "../common/Types";
import * as _ from 'lodash';

@Injectable()
export class MovieResolver implements Resolve<any> {
  movieState$: Observable<IMovieDetail>;
  constructor(private store: Store<IMovieDetail>, private router: Router, private movieActions: MovieStateActions) {
    this.movieState$ = this.store.select('movie');
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any>|any {
    let id = route.params['id'];
    if(_.isUndefined(id)){
      console.log('No movie id, go back to the list page');
      this.router.navigate(['/movies']);
      return null;
    }
    else {
      this.store.dispatch(this.movieActions.loadMovie(id));
      console.log('Has some id, return the observable for data');
      return {dataSource: this.movieState$.map((state) => {
        if(_.has(state, 'movieDetails')) {
          return _.assign({}, state.movieDetails[id], {currentSearchText: state.currentSearchText});
        }
        return null;
      })};
    }
  }
}
