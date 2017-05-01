import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import * as moment from 'moment';

import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild
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
    // Extracts current page
    this.currentPage$ = this.movieState.map((state) => {
      console.log('Extract current page:', state.page);
      return state.page;
    });
    // Extracts total number of pages
    this.totalPages$ = this.movieState.map((state) => {
      console.log('Extract total number of pages:', state.total_pages);
      return state.total_pages;
    });
    // Extracts movie list
    this.movies$ = this.movieState.map((state) => {
      console.log('Received top rated movie list: ', state.results);
      console.log('Updates base url for images');
      console.log('Updates genre name');
      let appInfo = this.application;
      let getUrl = (defaultSize, path) => {
        return appInfo.imageBaseUrl + defaultSize + path;
      };
      if(state.results) {
        // Performs some transformation for data
        state.results.forEach((item) => {
          // Builds backdrop URL
          item.backdrop_url = getUrl('w780', item.backdrop_path);

          // Builds poster URL
          item.poster_url = getUrl('w92', item.poster_path);
          // Injects genre information
          item.genres = item.genre_ids.map((item) => {
            return appInfo.getGenreObj(item);
          });
          item.genres.sort((genre1, genre2) => {
            return genre1.name > genre2.name;
          });
        });
      }
      else {
        state.results = [];
      }
      console.log(state.results);
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

  changePage(newPage) {
    this.store.dispatch(this.movieActions.loadMovieList(newPage));
  }
}
