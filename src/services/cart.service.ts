import { Injectable } from '@angular/core';
import { MovieModel } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private static instance: CartService;

  private constructor() {}

  public static getInstance() {
    if (this.instance == null) this.instance = new CartService();
    return this.instance;
  }

  public retrieveAllMovies(): MovieModel[] {
    let json = localStorage.getItem('movies');
    if (json == null) {
      localStorage.setItem('movies', JSON.stringify([]));
      json = localStorage.getItem('movies');
    }

    return JSON.parse(json!);
  }

  public bookMovie(model: MovieModel) {
    const arr = this.retrieveAllMovies();
    arr.push(model);
    localStorage.setItem('movies', JSON.stringify(arr));
  }
}
