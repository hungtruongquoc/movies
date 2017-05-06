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
import {MovieComponent} from './movie/movie.component';
import {NotFoundPageComponent} from "./common/no-found-page";
import {MovieItemComponent} from './movie-item/movie-item.component';
import {Actions, EffectsModule} from "@ngrx/effects";
import {MovieEffects} from "./effects/movie";
import {AppStateActions} from "./actions/application";
import {AppEffects} from "./effects/application";
import {MovieStateActions} from "./actions/movie";
import {ApplicationService} from "./sevices/application";
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationButtonComponent } from './pagination/pagination-button/pagination-button.component';
import {NgPipesModule} from "angular-pipes";
import { LessMoreTextComponent } from './common/less-more-text/less-more-text.component';
import { BootstrapSimpleCardComponent } from './common/bootstrap-simple-card/bootstrap-simple-card.component';
import { MovieDetailComponent } from './movie-item/movie-detail/movie-detail.component';
import { LessMoreButtonComponent } from './common/less-more-button/less-more-button.component';
import { SearchComponent } from './common/search/search.component';
import { BaseComponent } from './common/base/base.component';
import { ListviewComponent } from './common/listview/listview.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'movies', pathMatch: 'full'},
  {path: 'movies', component: MovieComponent},
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
    MovieComponent,
    NotFoundPageComponent,
    MovieItemComponent,
    PaginationComponent,
    PaginationButtonComponent,
    LessMoreTextComponent,
    BootstrapSimpleCardComponent,
    MovieDetailComponent,
    LessMoreButtonComponent,
    SearchComponent,
    BaseComponent,
    ListviewComponent
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
    NgPipesModule
  ],
  providers: [MovieService, AppStateActions, MovieStateActions, ApplicationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {

  }
}
