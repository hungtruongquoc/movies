import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Movie} from "../models/movie";


@Injectable()
export class MovieService {
  private API_KEY = '207ed00a90c04ead5e36ce131acb23ca';
  private API_PATH = 'https://api.themoviedb.org/3';

  constructor(private http: Http) {}

  searchMovies(queryTitle: string): Observable<Movie[]> {
    let searchUrl = `${this.API_PATH}/search/movie?api_key=${this.API_KEY}&language=en-US&query=${queryTitle}&page=1`;
    return this.http.get(searchUrl).map(res => {
      return res.json().results || [];
    });
  }

  retrieveMovie(movieId: string): Observable<Movie> {
    let detailUrl = `${this.API_PATH}/search/movie/${movieId}?api_key=${this.API_KEY}&language=en-US`;
    return this.http.get(detailUrl).map(res => {
      console.log(res);
      return res.json();
    });
  }
}
