import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {MovieService} from "../sevices/movies";
import {MovieComponent} from "./movie.component";
import {RouterModule, Routes} from "@angular/router";
import {MovieDetailComponent} from "../movie-item/movie-detail/movie-detail.component";
import {MovieItemComponent} from "../movie-item/movie-item.component";
import {ReviewItemComponent} from "../common/review-item/review-item.component";
import {ListviewComponent} from "../common/listview/listview.component";
import {BootstrapSimpleCardComponent} from "../common/bootstrap-simple-card/bootstrap-simple-card.component";
import {LessMoreButtonComponent} from "../common/less-more-button/less-more-button.component";
import {LessMoreTextComponent} from "../common/less-more-text/less-more-text.component";
import {PaginationComponent} from "../pagination/pagination.component";
import {PaginationButtonComponent} from "../pagination/pagination-button/pagination-button.component";
import {NgPipesModule} from "angular-pipes";
import {MovieResolver} from "./movie.resolver";
import { MovieListComponent } from './movie-list/movie-list.component';
import { ReviewListComponent } from './review-list/review-list.component';
import {SearchComponent} from "../common/search/search.component";

const movieRoutes: Routes = [
  {
    path: 'movies',  component: MovieComponent,
    children: [
      {
        path: '',
        component: MovieListComponent,
      },
      {
        path: ':id',
        component: MovieDetailComponent,
        resolve: {
          movie: MovieResolver
        }
      },
      {
        path: ':id/reviews',
        component: ReviewListComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(movieRoutes),
    NgPipesModule
  ],
  declarations: [
    MovieComponent,
    MovieItemComponent,
    MovieDetailComponent,
    ReviewItemComponent,
    ListviewComponent,
    BootstrapSimpleCardComponent,
    LessMoreTextComponent,
    LessMoreButtonComponent,
    PaginationComponent,
    PaginationButtonComponent,
    MovieListComponent,
    ReviewListComponent,
    SearchComponent
  ],
  providers: [ MovieService, MovieResolver ]
})
export class MovieModule {}
