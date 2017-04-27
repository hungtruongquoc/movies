import {ActivatedRouteSnapshot, CanActivate} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class PreLoadingGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>,){

  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForConfigurationToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getCollectionLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForConfigurationToLoad();
  }
}
