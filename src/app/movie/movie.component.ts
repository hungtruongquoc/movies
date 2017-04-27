import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';

import * as fromRoot from '../reducers';
import * as movie from '../actions/movie';

import {Observable} from "rxjs/Observable";
import {Movie} from "../models/movie";
import {Store} from "@ngrx/store";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private store: Store<fromRoot.State>) {
    this.query = store.select(fromRoot.getSearchQuery).take(1);
    this.movies$ = store.select(fromRoot.getSearchResults);
    this.searching = store.select(fromRoot.getSearchLoading);
  }

  movies$: Observable<Movie[]>;

  @Input()
  searching: Observable<boolean>;

  @Output()
  search = new EventEmitter<string>();

  @Input()
  query: Observable<string>;

  searchMovies(query) {
    this.store.dispatch(new movie.SearchAction(query))
  }

  ngOnInit() {
  }
}
