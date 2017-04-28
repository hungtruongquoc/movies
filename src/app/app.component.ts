import {ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppConfiguration} from "./common/Types";
import {Observable} from "rxjs/Observable";
import {LOAD_CONFIG} from "./reducers/index";
import {AppStateActions} from "./actions/application";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'app works!';
  preLoadingCompleted: Observable<boolean>;
  appState: Observable<IAppConfiguration>;

  constructor(private cd: ChangeDetectorRef, private appActions: AppStateActions, private store: Store<IAppConfiguration>) {
    this.appState = this.store.select('application');
    console.log('Get store object: ', this.store.select('application'));
    this.preLoadingCompleted = this.appState.map((state) => state.isLoadingConfig);
  }

  ngOnInit(){
    console.log('Dispatches the load config action');
    this.store.dispatch(this.appActions.loadConfiguration());
  }
}
