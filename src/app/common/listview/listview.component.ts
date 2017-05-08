import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Output()
  pageChanged: EventEmitter<number> = new EventEmitter();

  @Input()
  hidePaginationComponent: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  @Input()
  listCurrentPage: number;

  @Input()
  listTotalPages: number;

  pageChangedInPagination(pageNumber){
    this.pageChanged.emit(pageNumber);
  }

}
