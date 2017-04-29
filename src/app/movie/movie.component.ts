import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit
} from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Movie} from "../models/movie";
import {Store} from "@ngrx/store";
import {MovieStateActions} from "../actions/movie";
import {IMovieSearchResult} from "../common/Types";
import {ApplicationService} from "../sevices/application";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent implements OnInit {

  movies$: Observable<Movie[]>;
  currentPage$: Observable<number>;
  movieState: Observable<IMovieSearchResult>;
  totalPages$: Observable<number>;

  @Input()
  searching: Observable<boolean>;

  constructor(private cd: ChangeDetectorRef, private movieActions: MovieStateActions,
              private store: Store<IMovieSearchResult>, private application: ApplicationService) {
    this.movieState = this.store.select('movie');
    console.log('Get movie store object', this.movieState);
    this.currentPage$ = this.movieState.map((state) => {
      console.log('Extract current page:', state.page);
      return state.page;
    });
    this.totalPages$ = this.movieState.map((state) => {
      console.log('Extract total number of pages:', state.total_pages);
      return state.total_pages;
    });
    this.movies$ = this.movieState.map((state) => {
        console.log('Received top rated movie list: ', state.results);
        if (this.application.imageBaseUrl !== '') {
          console.log('Updates base url for images');
          console.log('Updates genre name');
          let appInfo = this.application;
          state.results.forEach((item) => {
            item.backdrop_path = appInfo.imageBaseUrl + 'w780' + item.backdrop_path;
            item.poster_path = appInfo.imageBaseUrl + 'w92' + item.poster_path;
            item.genres = item.genre_ids.map((item) => {
              return appInfo.getGenreObj(item);
            });
          });
          console.log(state.results);
        }
        return state.results;
      }
    );
  }

  searchMovies() {
    console.log('Dispatches the load movie search result list action');
    this.store.dispatch(this.movieActions.loadMovieList());
  }

  ngOnInit() {
    this.searchMovies();
  }
}
