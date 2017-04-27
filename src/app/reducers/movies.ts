import {createSelector} from 'reselect';
import {Movie} from '../models/movie';
import * as movie from '../actions/movie';
import * as collection from '../actions/collection';


export interface State {
  ids: number[];
  entities: { [id: number]: Movie };
  selectedMovieId: number | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedMovieId: null,
};

export function reducer(state = initialState, action: movie.Actions | collection.Actions): State {
  switch (action.type) {
    case movie.SEARCH_COMPLETE:
    case collection.LOAD_SUCCESS: {
      const movies = action.payload;
      const newMovies = movies.filter(movie => !state.entities[movie.id]);

      const newMovieIds = newMovies.map(movie => movie.id);
      const newMovieEntities = newMovies.reduce((entities: { [id: number]: Movie }, movie: Movie) => {
        return Object.assign(entities, {
          [movie.id]: movie
        });
      }, {});

      return {
        ids: [...state.ids, ...newMovieIds],
        entities: Object.assign({}, state.entities, newMovieEntities),
        selectedMovieId: state.selectedMovieId
      };
    }

    case movie.LOAD: {
      const movie = action.payload;

      if (state.ids.indexOf(movie.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, movie.id],
        entities: Object.assign({}, state.entities, {
          [movie.id]: movie
        }),
        selectedMovieId: state.selectedMovieId
      };
    }

    case movie.SELECT: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedMovieId: action.payload
      };
    }

    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedBookId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
