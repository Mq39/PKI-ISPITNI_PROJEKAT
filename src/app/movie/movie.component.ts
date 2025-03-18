import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import movieData from '../mocks/movies.json';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  public movie: MovieModel | undefined;
  public movieName: String | undefined;
  public reservation: any = 0;

  constructor(private route: ActivatedRoute) {}

  removeTicket() {
    this.reservation--;
  }
  addTicket() {
    this.reservation++;
  }

  ngOnInit(): void {
    // const movieName = this.route.snapshot.paramMap.get('name');

    this.route.params.subscribe((params: Params) => (this.movieName = params['name']));
    this.movie = movieData.find((movie) => movie.name == this.movieName);
  }
}
