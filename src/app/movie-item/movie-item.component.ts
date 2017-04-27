import {Component, Input, OnInit} from '@angular/core';
import {Movie} from "../models/movie";

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  @Input()
  data: Movie = null;

  constructor() { }

  ngOnInit() {
  }

}
