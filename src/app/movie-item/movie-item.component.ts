import {
  ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, EventEmitter,
  Output, ChangeDetectorRef
} from '@angular/core';
import {Movie} from "../models/movie";
import {Store} from "@ngrx/store";
import {IMovieDetail} from "../common/Types";
import {Observable} from "rxjs/Observable";
import {MovieStateActions} from "../actions/movie";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit, OnChanges {

  @Input()
  data: Movie = null;
  overview$: Observable<any>;
  detailInfo$: Observable<any>;
  doShowDetail: boolean = false;
  movieDetail$: Observable<IMovieDetail>;
  rate: number = 0;

  @Output()
  itemNeedToShowDetail: EventEmitter<any> = new EventEmitter();

  @Input()
  index: number = 0;

  _isHidden: boolean = false;

  @Input()
  set isHidden(value: boolean) {
    this._isHidden = value;
    this.cd.detectChanges();
  }
  get isHidden(){
    return this._isHidden;
  }

  constructor(private store: Store<IMovieDetail>, private movieActions: MovieStateActions,
              private cd: ChangeDetectorRef, private router: Router) {
    this.movieDetail$ = store.select('movie');
    this.detailInfo$ = this.movieDetail$.map(detail =>{
      if(detail.hasOwnProperty('movieDetails') && detail.movieDetails.hasOwnProperty(this.data.id)) {
        return detail.movieDetails[this.data.id];
      }
      return null;
    });
  }

  ngOnChanges() {

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

  showDetail(movieId, event) {
    event.preventDefault();
    // this.doShowDetail = !this.doShowDetail;
    // if (this.doShowDetail === true) {
    //   this.store.dispatch(this.movieActions.loadMovie(this.data.id));
    // }
    // this.itemNeedToShowDetail.emit({detailIsShown: this.doShowDetail, index: this.index});
    this.router.navigate(['/movies', movieId]);
  }

  ngOnInit() {

  }

}
