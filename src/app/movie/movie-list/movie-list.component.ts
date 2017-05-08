import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Movie} from "../../models/movie";
import {IMovieSearchResult} from "../../common/Types";
import {MovieStateActions} from "../../actions/movie";
import {Store} from "@ngrx/store";
import {BaseComponent} from "../../common/base/base.component";
import * as _ from 'lodash';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent extends BaseComponent implements OnInit, AfterViewInit {

  movies$: Observable<Movie[]>;
  currentPage$: Observable<number>;
  movieState: Observable<IMovieSearchResult>;
  totalPages$: Observable<number>;
  currentText: string = null;

  constructor(private cd: ChangeDetectorRef, private movieActions: MovieStateActions, el: ElementRef,
              private store: Store<IMovieSearchResult>, private route: ActivatedRoute,) {
    super(el);
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
      if(_.has(state, 'currentSearchText')) {
        this.currentText = _.get(state, 'currentSearchText', null);
      }
      if (!state.results || state.results.length < 1) {
        state.results = [];
      }
      console.log(state.results);
      return state.results;
    });
  }

  changePage(newPage) {
    this.loadMovieList(newPage, this.currentText);
  }

  search(text: string) {
    this.currentText = text;
    this.loadMovieList(1, this.currentText);
  }

  loadMovieList(page: number = 1, searchText: string = '') {
    console.log('Dispatches the load movie search result list action');
    this.store.dispatch(this.movieActions.loadMovieList(page, searchText));
  }

  ngAfterViewInit() {
    this.raiseInitEvent();
  }

  ngOnInit() {
    this.currentText = this.route.snapshot.queryParams['search'];
    this.loadMovieList(1, this.currentText);
  }

}
