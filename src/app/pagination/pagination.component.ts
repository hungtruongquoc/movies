import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, OnChanges
} from '@angular/core';
import 'rxjs/observable/from';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  currentPage: number = 0;

  @Input()
  totalPages: number = 0;

  pages: number[] = [];
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }

  ngOnChanges() {
    console.log('Generates pagination item ...');
    this.pages = Array(this.totalPages).fill(0).map((item, index) => {return index;});
    console.log(this.pages);
  }

}
