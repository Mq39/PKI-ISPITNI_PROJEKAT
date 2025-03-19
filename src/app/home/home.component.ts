import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MovieModel } from '../../models/movie.model';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import movieData from '../mocks/movies.json';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    NgFor,
    RouterLink,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public recommended: MovieModel[] = movieData;
  public search: MovieModel[] = movieData;
  public selected: string = 'Currently showing';

  public filterDate() {
    if (this.selected == 'Currently showing') {
      this.search = movieData;
      return;
    }
    this.search = this.recommended.filter((movie) => movie.dateOfShowing.includes(this.selected.toLowerCase()));

    if (this.search.length == 0) {
      Swal.fire({
        title: 'No projections on the given date.',
        icon: 'info',
        confirmButtonText: 'I understand',
      }).then(() => {
        this.selected = 'Currently showing';
      });

      this.search = movieData;
    }
  }
}
