import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Movie} from "../models/movie";
import 'rxjs/operator/combineAll';

@Injectable()
export class MovieService {
  static API_KEY = '207ed00a90c04ead5e36ce131acb23ca';
  static API_PATH = 'https://api.themoviedb.org/3';
  static API_CONFIGURATION = MovieService.API_PATH + '/configuration?api_key=' + MovieService.API_KEY;
  static API_GENRE_LIST = MovieService.API_PATH + '/genre/movie/list?api_key=' + MovieService.API_KEY
    + '&language=en-US';

  imageBaseUrl: string = '';
  defaultSize: string = '';

  constructor(private http: Http) {
  }

  searchMovies(page: number = 1): Observable<Movie[]> {
    console.log('Load top rated movies ');
    let searchUrl = `${MovieService.API_PATH}/movie/top_rated?api_key=${MovieService.API_KEY}&language=en-US&&page=${page}&region=US`;
    return this.http.get(searchUrl).map(res => {
      console.log('Top rated list result is: ', res);
      return res.json() || [];
    });
  }

  retrieveMovie(movieId: string): Observable<Movie> {
    let detailUrl = `${MovieService.API_PATH}/search/movie/${movieId}?api_key=${MovieService.API_KEY}&language=en-US`;
    return this.http.get(detailUrl).map(res => {
      console.log('Selected movie data from API: ', res);
      return res.json();
    });
  }

  getConfiguration() {
    console.log('Sends request to get configuration');
    return this.http.get(MovieService.API_CONFIGURATION).combineLatest(this.getGenre())
      .map((responses) => {
        return Object.assign({}, responses[0].json(), responses[1].json());
      });
  }

  getGenre() {
    console.log('Sends request to get genre list');
    return this.http.get(MovieService.API_GENRE_LIST);
  }
}
