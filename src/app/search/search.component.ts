import { Component } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { NgFor } from '@angular/common';
import movieData from '../mocks/movies.json';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [NgFor, FormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  public movies: MovieModel[] = movieData;
  public search: MovieModel[] = movieData;
  public searchQuery: string = '';

  searchMovies(): void {
    this.search = this.movies.filter(
      (movie) =>
        movie.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.dateOfRelease.includes(this.searchQuery) ||
        movie.dateOfShowing.includes(this.searchQuery) ||
        movie.price.toString().concat('$').includes(this.searchQuery) ||
        movie.duration.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.director.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        movie.genre.some((genre) => {
          return genre.toLowerCase().includes(this.searchQuery.toLowerCase());
        }) ||
        movie.actors.some((actor) => {
          return actor.toLowerCase().includes(this.searchQuery.toLowerCase());
        })
    );
  }
}
