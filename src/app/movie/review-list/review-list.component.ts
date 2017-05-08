import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BaseComponent} from "../../common/base/base.component";
import {Store} from "@ngrx/store";
import {IMovieSearchResult} from "../../common/Types";
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {MovieStateActions} from "../../actions/movie";
import * as _ from 'lodash';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent extends BaseComponent implements OnInit {

  @Input()
  data: Observable<any>;

  @Input()
  movieId: string = null;

  movieState$: Observable<IMovieSearchResult>;

  constructor(el: ElementRef, private store: Store<IMovieSearchResult>, private route: ActivatedRoute,
              private router: Router, private movieActions: MovieStateActions) {
    super(el);
    this.movieState$ = this.store.select('movie');
    this.movieId = this.route.snapshot.params['id'];
    this.store.dispatch(this.movieActions.loadMovie(this.movieId));
  }

  ngOnInit() {
    this.data = this.movieState$.map((state) => {
      if(_.isObject(state) && _.has(state, 'movieDetails.' + this.movieId)){
        return (<any>_.get(state, 'movieDetails.' + this.movieId)).reviews;
      }
      return null;
    });
  }

}
