
import {Injectable} from "@angular/core";
import {Actions, Effect} from "@ngrx/effects";
import {AppStateActions} from "../actions/application";
import {MovieService} from "../sevices/movies";

@Injectable()
export class AppEffects {
  constructor(private update$: Actions, private appAction: AppStateActions, private service: MovieService ) {}
  @Effect() loadConfiguration$ = this.update$.ofType(AppStateActions.LOAD_CONFIGURATION)
    .switchMap(()=>this.service.getConfiguration())
    .map(configuration => this.appAction.loadConfigurationSuccess(configuration));
  @Effect() loadGenre = this.update$.ofType(AppStateActions.LOAD_GENRE)
    .switchMap(()=>this.service.getGenre())
    .map(genreList => this.appAction.loadGenreSuccess(genreList))
}
