import {combineReducers} from '@ngrx/store';
import {compose} from "@ngrx/core";
import {movieState} from "./movies";
import {applicationState} from "./application";

export const LOAD_CONFIG = 'LOAD_CONFIG';

export default compose(combineReducers)({
  application: applicationState,
  movie: movieState
});


