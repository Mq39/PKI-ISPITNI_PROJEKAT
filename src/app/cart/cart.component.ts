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

  public constructor() {
    this.cartService = CartService.getInstance();
  }

  ngOnInit(): void {
    let savedMovies = localStorage.getItem('movies');
    this.bookedMovies = JSON.parse(savedMovies!);
  }
}
