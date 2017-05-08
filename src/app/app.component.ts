import {ChangeDetectionStrategy, Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {IAppConfiguration} from "./common/Types";
import {Observable} from "rxjs/Observable";
import {LOAD_CONFIG} from "./reducers/index";
import {AppStateActions} from "./actions/application";
import {ApplicationService} from "./sevices/application";
import {NavigationEnd, Router} from "@angular/router";
import {ISearchable} from "./common/base/base.component";

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
  genreList: Observable<any>;
  dataSource: ISearchable = null;
  isSearchDisabled: boolean = false;

  constructor(private cd: ChangeDetectorRef, private appActions: AppStateActions,
              private store: Store<IAppConfiguration>, private application: ApplicationService) {
    this.appState = this.store.select('application');
    console.log('Get store object: ', this.appState);
    this.preLoadingCompleted = this.appState.map((state) => {
      console.log('Loading process is completed: ', state.isLoadingConfig);
      return state.isLoadingConfig;
    });
    this.appState.map((state)=>{
      if(state !== null && state.config !== null){
        if(state.config.hasOwnProperty('genres')){
          return state.config.genres;
        }
      }
      return [];
    }).subscribe((genreList) => {
      console.log('Retrieve Genre list', genreList);
      this.application.genreList = genreList;
    });
    // Sets application state retrieving
    this.appState.map((state) => {
      if(state !== null && state.config !== null){
        console.log('Extract images configuration', state.config);
        if(state.config.hasOwnProperty('images')){
          return state.config.images.base_url;
        }
      }
      return '';
    }).subscribe((baseUrl) => {
      console.log('Set base url for images', baseUrl);
      this.application.imageBaseUrl = baseUrl;
    });
    window.addEventListener('dataItemViewInit', function(event: CustomEvent) {
      this.dataSource = event.detail;
    }.bind(this))
  }

  ngOnInit(){
    console.log('Dispatches the load config action');
    this.store.dispatch(this.appActions.loadConfiguration());
  }
}
