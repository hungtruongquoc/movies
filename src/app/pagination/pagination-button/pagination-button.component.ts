import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: '[app-pagination-button]',
  templateUrl: './pagination-button.component.html',
  styleUrls: ['./pagination-button.component.css']
})
export class PaginationButtonComponent implements OnInit {

  constructor() { }

  @Input()
  ariaLabel: string = null;

  @HostBinding('class.page-item')
  isPageItem: boolean = true;

  ngOnInit() {
  }

}
