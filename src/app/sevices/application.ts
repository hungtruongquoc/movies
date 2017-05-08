import {Injectable} from "@angular/core";

@Injectable()
export class ApplicationService {
  public imageBaseUrl: string = '';
  public defaultThumbnailSize: string = '';
  public genreList: any[] = [];
  public getGenreObj(genreId: number){
    let selectedItem = null;
    selectedItem = this.genreList.filter((item) => {
      return item.id === genreId;
    })[0];
    return selectedItem;
  }

  public getSmallPosterUrl(posterPath: string = '') {
    if(posterPath !== '') {
      return this.imageBaseUrl + '/w185/' + posterPath;
    }
    return '';
  }

  public getLargePoasterUrl(posterPath: string = '') {
    if(posterPath !== ''){
      return this.imageBaseUrl + '/w342/' + posterPath;
    }
    return ''
  }

  public getLogoUrl(posterPath: string) {
    if(posterPath !== ''){
      return this.imageBaseUrl + '/w45/' + posterPath;
    }
    return ''
  }

  public genreName(genreId: number) {
   let object = this.getGenreObj(genreId);
   if(object !== null) {
     return object.name;
   }
   return null;
  }

  public convertGenreIdsToGenreArray(idArray: number[]){
    return idArray.map((item) => {
      return this.getGenreObj(item);
    }, this);
  }
}
