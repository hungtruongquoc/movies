import {Component, ElementRef, OnInit} from '@angular/core';

export interface ISearchable {
  search(text: string);
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  raiseInitEvent() {
    let event = new CustomEvent('dataItemViewInit', {detail: this});
    window.dispatchEvent(event);
  }

  protected el: ElementRef;

  constructor(el: ElementRef) {
    this.el = el;
  }

  ngOnInit() {
  }

}
