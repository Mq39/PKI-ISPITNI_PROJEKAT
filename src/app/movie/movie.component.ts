import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import movieData from '../mocks/movies.json';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgIf],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  public movie: MovieModel | undefined;
  public movieName: String | undefined;
  public numOfTickets: any = 0;
  public totalPrice: any = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  removeTicket() {
    this.numOfTickets--;
    this.totalPrice -= this.movie!.price;
  }
  addTicket() {
    this.numOfTickets++;
    this.totalPrice += this.movie!.price;
  }

  ngOnInit(): void {
    // const movieName = this.route.snapshot.paramMap.get('name');

    this.route.params.subscribe((params: Params) => (this.movieName = params['name']));
    this.movie = movieData.find((movie) => movie.name == this.movieName);
  }

  continueShopping() {
    Swal.fire({
      title: 'Order confirmed!',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#097969',
      confirmButtonText: 'Back to projections',
      cancelButtonText: 'Checkout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/cart']);
      }
    });
  }
}
