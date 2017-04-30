import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, OnChanges, EventEmitter, Output
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

  @Output()
  public pageClickedEvent: EventEmitter<number> = new EventEmitter();

  private numberOfLeftPages = 3;
  private numberofRightPages = 3;

  pages: number[] = [];
  leftPages: number[] = [];
  rightPages: number[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }

  private generatePageItems() {
    console.log('Generates pagination item ...');
    this.leftPages = Array(this.numberOfLeftPages).fill(0).map((item, index) => {return index;});
    this.rightPages = Array(this.numberofRightPages).fill(0).map((item, index) => {return this.totalPages - index;}).reverse();
    console.log(this.leftPages);
    console.log(this.rightPages);
  }

  ngOnChanges() {
    this.generatePageItems();
  }

  pageClicked(event){
    event.preventDefault();
  }

  isButtonDisabled(){
    return this.currentPage === 0 || this.currentPage === this.totalPages - 1;
  }

}
