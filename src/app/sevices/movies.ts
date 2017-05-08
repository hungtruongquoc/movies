import 'rxjs/add/operator/map';
import 'rxjs/add/operator/combineLatest';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Movie} from "../models/movie";
import 'rxjs/operator/combineAll';
import * as moment from 'moment';
import {Action} from "@ngrx/store";
import {ApplicationService} from "./application";
import * as _ from 'lodash';

@Injectable()
export class MovieService {
  static API_KEY = '207ed00a90c04ead5e36ce131acb23ca';
  static API_PATH = 'https://api.themoviedb.org/3';
  static API_CONFIGURATION = MovieService.API_PATH + '/configuration?api_key=' + MovieService.API_KEY;
  static API_GENRE_LIST = MovieService.API_PATH + '/genre/movie/list?api_key=' + MovieService.API_KEY
    + '&language=en-US';

  imageBaseUrl: string = '';
  defaultSize: string = '';

  constructor(private http: Http, private application: ApplicationService) {
  }

  static getBaseUrlWithApiKey(action: string = 'discover') {
    return MovieService.API_PATH + '/' + action + '/movie?api_key=' + MovieService.API_KEY;
  }

  static getDiscoverMovieUrl(page, currentYear) {
   return MovieService.getBaseUrlWithApiKey() + '&language=en-US&&page=' + page
     + '&region=US&sort_by=vote_average.desc&vote_average.gte=1' + '&release_date.gte=' + currentYear
     + '&vote_count.gte=100';
  }

  static getSearchMovieUrl(page: number = 1, text: string = '') {
    let currentYear = moment().year();
    return MovieService.getBaseUrlWithApiKey('search') + '&language=en-US&query=' + encodeURI(text)
      + '&page=' + page + '&include_adult=false&year=' + currentYear
  }

  searchMovies(page: number = 1, text: string = null): Observable<Movie[]> {
    console.log('Load top rated movies ');
    let currentYear = moment().year() + '-1-1';
    let searchUrl = MovieService.getDiscoverMovieUrl(page, currentYear);
    if(text !== null && text !== '') {
      searchUrl = MovieService.getSearchMovieUrl(page, text);
    }
    return this.http.get(searchUrl).map(res => {
      console.log('Top rated list result is: ', res);
      let result = res.json();
      result.results.forEach((item) => {
        // Gets logo url for each item
        if(item.vote_count > 0 && item.vote_average > 0) {
          item.logo_url = this.application.getLogoUrl(item.poster_path);
        }
        // Gets genre list for each item
        if(item.genre_ids && item.genre_ids.length > 0) {
          item.genres = this.application.convertGenreIdsToGenreArray(item.genre_ids);
        }
        let durationRelease = moment(item.release_date, 'YYYY-MM-DD').diff(moment(), 'weeks') * -1;
        item.releaseDuration = durationRelease + ' weeks ago';
        item.formattedReleaseDate = moment(item.release_date, 'YYYY-MM-DD').format('MMM DD, YYYY');
        item.isRecent = durationRelease <= 4;
      }, this);
      // Filters some results which are not valid
      result.results = _.filter(result.results, (item: any) => {return item.vote_count > 1 && item.vote_average > 0});
      // Sorts the list by the vote average
      result.results = result.results.sort((movie1, movie2) => {
        return (movie1.vote_average - movie2.vote_average)*-1;
      });
      // Stores the current search text
      result.currentSearchText = text;
      return result || null;
    }, this).catch((error)=>{
      return [];
    });
  }

  retrieveMovie(movieId): Observable<any> {
    console.log('Start loading movie ', movieId);
    let paramType = typeof movieId;
    if(_.isObject(movieId)){
      console.log('Movie detail is available from local');
      return Observable.of(Object.create({})).map(data => movieId.loadedMovie);
    }
    else {
      console.log('Movie detail is not available from local. Try fetching from server.');
      let detailUrl = `${MovieService.API_PATH}/movie/${movieId}?api_key=${MovieService.API_KEY}&language=en-US&append_to_response=credits,reviews,genres,keywords`;
      return this.http.get(detailUrl).map(res => {
        console.log('Selected movie data from API: ', res);
        let result = res.json();
        result.poster_url = this.application.getSmallPosterUrl(result.poster_path);
        result.poster_url_large = this.application.getLargePoasterUrl(result.poster_path);
        result.credits.mainArtists = _.take(result.credits.cast, 3);
        result.credits.director = _.take(result.credits.crew, 1)[0];
        return result || null;
      }, this).catch((error) => {
        return null;
      });
    }
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
