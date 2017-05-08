import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {IMovieDetail} from "../../common/Types";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(private store: Store<IMovieDetail>, private route: ActivatedRoute, private router: Router) { }

  @Output()
  closeButtonClick: EventEmitter<any> = new EventEmitter();

  @Input()
  data: Observable<any>;

  ngOnInit() {
    this.data = this.route.data;
    this.route.data.subscribe((movieSource) => {
      this.data = movieSource.movie.dataSource;
      console.log('Selected movie in detail view: ', this.data);
    })
  }

  closeButtonClicked(event) {
    event.preventDefault();
    this.closeButtonClick.emit(event);
    this.router.navigate(['/movies']);
  }

}
