import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor() { }

  @Output()
  closeButtonClick: EventEmitter<any> = new EventEmitter();

  @Input()
  data: Observable<any>;

  ngOnInit() {
  }

  closeButtonClicked(event) {
    event.preventDefault();
    this.closeButtonClick.emit(event);
  }

}
