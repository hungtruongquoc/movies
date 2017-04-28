import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit,
  Output
} from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Movie} from "../models/movie";
import {Store} from "@ngrx/store";
import {MovieStateActions} from "../actions/movie";
import {IMovieSearchResult} from "../common/Types";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MovieStateActions]
})
export class MovieComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private movieActions: MovieStateActions,
              private store: Store<IMovieSearchResult>) {

  }

  movies$: Observable<Movie[]>;

  @Input()
  searching: Observable<boolean>;

  @Output()
  search = new EventEmitter<string>();

  @Input()
  query: Observable<string>;

  searchMovies(query) {
    console.log('Dispatches the load config action');
    this.store.dispatch(this.movieActions.loadMovieList());
  }

  ngOnInit() {
  }
}
