import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  @Output()
  textChange: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
  }

  emitValue(value: string){
    this.textChange.emit(value);
  }

}
