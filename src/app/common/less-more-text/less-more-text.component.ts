import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-less-more-text',
  templateUrl: './less-more-text.component.html',
  styleUrls: ['./less-more-text.component.css']
})
export class LessMoreTextComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input()
  text: string = '';

  doShowFullOverview: boolean = false;

  toggleShowFullOverview() {
    this.doShowFullOverview = !this.doShowFullOverview;
  }

}
