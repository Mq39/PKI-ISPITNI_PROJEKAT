import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';
import { MovieModel } from '../../models/movie.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  public bookedMovies: MovieModel[] = [];
  public cartService: CartService;
  public totalAmount: number = 0;

  public constructor() {
    this.cartService = CartService.getInstance();
  }

  ngOnInit(): void {
    let savedMovies = localStorage.getItem('movies');
    this.bookedMovies = JSON.parse(savedMovies!);
    this.calculateTotalAmount();
  }

  public removeReservation(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This reservation will be removed!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookedMovies.splice(index, 1);
        localStorage.setItem('movies', JSON.stringify(this.bookedMovies));
        this.calculateTotalAmount();
        Swal.fire('Deleted!', 'Your reservation has been canceled.', 'success');
      }
    });
  }
  calculateTotalAmount() {
    this.totalAmount = this.bookedMovies.reduce((sum, movie) => sum + movie.price * movie.numberOfTickets, 0);
  }
}
