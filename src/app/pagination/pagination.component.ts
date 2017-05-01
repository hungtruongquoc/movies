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

  static DEFAULT_LEFT_PAGES = 3;
  static DEFAULT_RIGHT_PAGES = 3;

  @Input()
  currentPage: number = 0;

  @Input()
  totalPages: number = 0;

  @Output()
  public pageClickedEvent: EventEmitter<number> = new EventEmitter();

  private numberOfLeftPages = PaginationComponent.DEFAULT_LEFT_PAGES;
  private numberOfRightPages = PaginationComponent.DEFAULT_RIGHT_PAGES;
  startPageRange: number = 0;
  endPageRange: number = 0;
  pages: number[] = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }

  private generatePageItems() {
    this.determineDisplayRange();
    console.log('Generates pagination items ...');
    console.log('Current page: ', this.currentPage);
    console.log('Start page range: ', this.startPageRange);
    console.log('End page range: ', this.endPageRange);
    if(this.endPageRange - this.startPageRange + 1 > 0) {
      this.pages = Array(this.endPageRange - this.startPageRange + 1);
      this.pages = this.pages.fill(0).map((item, index) => { return this.startPageRange + index;});
    }
    else {
      this.pages = [];
    }
    console.log('Display pages: ', this.pages);
  }

  ngOnChanges() {
    this.generatePageItems();
  }

  determineDisplayRange() {
    if(this.totalPages < PaginationComponent.DEFAULT_LEFT_PAGES + PaginationComponent.DEFAULT_LEFT_PAGES + 2) {
      this.numberOfLeftPages = 0;
      this.numberOfRightPages = 0;
    }
    else {
      this.numberOfRightPages = PaginationComponent.DEFAULT_RIGHT_PAGES;
      this.numberOfLeftPages = PaginationComponent.DEFAULT_LEFT_PAGES
    }

    this.startPageRange = this.currentPage - PaginationComponent.DEFAULT_LEFT_PAGES;
    if(this.startPageRange < 1) {
      this.startPageRange = 1;
    }
    this.endPageRange = this.currentPage + PaginationComponent.DEFAULT_RIGHT_PAGES;
    if(this.endPageRange > this.totalPages) {
      this.endPageRange = this.totalPages;
    }
  }

  pageClicked(event, newCurrentPage){
    event.preventDefault();
    let oldCurrentPage = this.currentPage;
    this.currentPage = newCurrentPage;
    if(newCurrentPage < 1) {
      this.currentPage = 1;
    }
    if(newCurrentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    console.log('New current page: ', this.currentPage);
    console.log('Old current page: ', oldCurrentPage);
    if(oldCurrentPage !== this.currentPage) {
      this.generatePageItems();
      this.pageClickedEvent.emit(this.currentPage);
    }
  }

  isPreviousButtonDisabled() {
    return this.currentPage === 1;
  }

  isNextButtonDisabled() {
    return this.currentPage === this.totalPages;
  }

  doShowLeftEllipsis() {
    return this.startPageRange - 1 > 1;
  }

  doShowRightEllipsis() {
    return this.totalPages - this.endPageRange > 1;
  }

}

