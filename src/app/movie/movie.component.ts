import 'rxjs/add/operator/let';
import 'rxjs/add/operator/take';
import * as moment from 'moment';

import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChildren,
  QueryList
} from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Movie} from "../models/movie";
import {Store} from "@ngrx/store";
import {MovieStateActions} from "../actions/movie";
import {IMovieSearchResult} from "../common/Types";
import {ApplicationService} from "../sevices/application";
import {BaseComponent, ISearchable} from "../common/base/base.component";
import {MovieItemComponent} from "../movie-item/movie-item.component";


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieComponent extends BaseComponent implements OnInit, AfterViewInit, ISearchable {
  private currentText: string = null;

  @Input()
  searching: Observable<boolean>;

  @ViewChildren(MovieItemComponent)
  items: QueryList<MovieItemComponent>;

  constructor(private cd: ChangeDetectorRef, private movieActions: MovieStateActions, el: ElementRef,
              private store: Store<IMovieSearchResult>, private application: ApplicationService) {
    super(el);

  }

  ngOnInit() {
    this.loadMovieList();
  }

  ngAfterViewInit() {
    this.raiseInitEvent();
    console.log(this.items, ' children');
  }


  search(text: string) {
    this.currentText = text;
    this.loadMovieList(1, text);
  }

  loadMovieList(page: number = 1, searchText: string = '') {
    console.log('Dispatches the load movie search result list action');
    this.store.dispatch(this.movieActions.loadMovieList(page, searchText));
  }


  processItemsDisplay(data){
    this.items.forEach((item, index) => {
      if(data.detailIsShown === true) {
        item.isHidden = data.index !== index;
      }
      else {
        item.isHidden = false;
      }
    })
  }
}
