import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Movie} from "../models/movie";


@Injectable()
export class MovieService {
  static API_KEY = '207ed00a90c04ead5e36ce131acb23ca';
  static API_PATH = 'https://api.themoviedb.org/3';
  static API_CONFIGURATION =  MovieService.API_PATH + '/configuration?api_key=' + MovieService.API_KEY;

  constructor(private http: Http) {}

  searchMovies(queryTitle: string): Observable<Movie[]> {
    let searchUrl = `${MovieService.API_PATH}/search/movie?api_key=${MovieService.API_KEY}&language=en-US&query=${queryTitle}&page=1`;
    return this.http.get(searchUrl).map(res => {
      return res.json().results || [];
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
    return this.http.get(MovieService.API_CONFIGURATION).map(res => {
      console.log('Configuration get from API: ', res);
      return res.json();
    });
  }
}
