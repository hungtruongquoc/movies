import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {StoreModule} from '@ngrx/store';
import {RouterStoreModule} from '@ngrx/router-store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import reducer  from './reducers';
import {MovieService} from './sevices/movies';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {NotFoundPageComponent} from "./common/no-found-page";
import {Actions, EffectsModule} from "@ngrx/effects";
import {MovieEffects} from "./effects/movie";
import {AppStateActions} from "./actions/application";
import {AppEffects} from "./effects/application";
import {MovieStateActions} from "./actions/movie";
import {ApplicationService} from "./sevices/application";
import { BaseComponent } from './common/base/base.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import {MovieModule} from "./movie/movie.module";

const appRoutes: Routes = [
  {path: '', redirectTo: '/movies', pathMatch: 'full'},
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    NotFoundPageComponent,
    BaseComponent,
    IndexComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),
    EffectsModule.run(MovieEffects),
    EffectsModule.run(AppEffects),
    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    RouterModule.forRoot(appRoutes),
    MovieModule
  ],
  providers: [MovieService, AppStateActions, MovieStateActions, ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
