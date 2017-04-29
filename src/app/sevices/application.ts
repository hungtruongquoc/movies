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
  public genreName(genreId: number) {
   let object = this.getGenreObj(genreId);
   if(object !== null) {
     return object.name;
   }
   return null;
  }
}
