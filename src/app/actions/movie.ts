import { Action } from '@ngrx/store';
import { Movie } from '../models/movie';

export const SEARCH =           '[Movie] Search';
export const SEARCH_COMPLETE =  '[Movie] Search Complete';
export const LOAD =             '[Movie] Load';
export const SELECT =           '[Movie] Select';


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) { }
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Movie[]) { }
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Movie) { }
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction
  | LoadAction
  | SelectAction;
