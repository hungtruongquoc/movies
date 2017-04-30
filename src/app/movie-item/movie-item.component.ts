import {ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, Renderer2} from '@angular/core';
import {Movie} from "../models/movie";
import * as moment from 'moment';
import {Store} from "@ngrx/store";
import {IMovieDetail} from "../common/Types";
import {Observable} from "rxjs/Observable";
import {MovieStateActions} from "../actions/movie";
import { TruncatePipe } from 'angular-pipes/src/string/truncate.pipe';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit, OnChanges {

  @Input()
  data: Movie = null;
  movieDetailInfo$: Observable<any>;
  doShowDetail: boolean = false;
  movieDetail$: Observable<IMovieDetail>;

  constructor(private renderer: Renderer2, private store: Store<IMovieDetail>, private movieActions: MovieStateActions) {
    this.movieDetail$ = store.select('movie');
    this.movieDetailInfo$ = this.movieDetail$.map(detail => detail);
  }

  ngOnChanges() {
    this.data.releaseDuration = moment(this.data.release_date, 'YYYY-MM-DD').diff(moment(), 'weeks') * -1 + ' weeks ago';
    this.data.formattedReleaseDate = moment(this.data.release_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
  }

  isNormalMovie() {
    return this.data.vote_average >= 5 && this.data.vote_average < 8;
  }

  isGoodMovie() {
    return this.data.vote_average >= 8;
  }

  isNotGoodMovie() {
    return this.data.vote_average < 5
  }

  showDetail(event) {
    event.preventDefault();
    this.doShowDetail = !this.doShowDetail;
    if (this.doShowDetail === true) {
      this.store.dispatch(this.movieActions.loadMovie(this.data.id));
    }
  }

  ngOnInit() {

  }

}
