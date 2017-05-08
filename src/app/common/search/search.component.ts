import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  private _isDisabled: boolean = false;

  @ViewChild('input')
  inputEl: ElementRef;

  @Output()
  textChange: EventEmitter<string> = new EventEmitter();

  @Input()
  set isDisabled(value: boolean) {
    this._isDisabled = value;
    this.inputEl.nativeElement.disabled = this._isDisabled;
  }

  get isDisabled(){
    return this._isDisabled;
  }

  _searchText: string = null;

  @Input()
  set searchText(value: string) {
    this._searchText = value;
  }

  get searchText():string {
    return this._searchText;
  }

  ngOnInit() {
  }

  emitValue(value: string){
    this.textChange.emit(value);
  }

}
