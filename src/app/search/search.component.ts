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
    this.search = this.movies.filter((movie) => movie.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }
}
