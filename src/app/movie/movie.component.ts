import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import movieData from '../mocks/movies.json';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
})
export class MovieComponent implements OnInit {
  public movie: MovieModel | undefined;
  public movieName: String | undefined;
  public numOfTickets: any = 0;
  public totalPrice: any = 0;

  public cartService: CartService;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.cartService = CartService.getInstance();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => (this.movieName = params['name']));
    this.movie = movieData.find((movie) => movie.name == this.movieName);
  }

  continueShopping() {
    Swal.fire({
      title: 'Choose your prefference',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#097969',
      confirmButtonText: 'Make a reservation',
      cancelButtonText: 'Pay now',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Reservation confirmed',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
      if (result.isConfirmed) {
        this.cartService.bookMovie({
          name: this.movie!.name,
          description: this.movie!.description,
          genre: this.movie!.genre,
          duration: this.movie!.description,
          director: this.movie!.director,
          actors: this.movie!.actors,
          dateOfRelease: this.movie!.dateOfRelease,
          dateOfShowing: this.movie!.dateOfShowing,
          rating: this.movie!.rating,
          coverImage: this.movie!.coverImage,
          price: this.movie!.price,
          numberOfTickets: this.numOfTickets,
        });
      }

      if (result.dismiss == Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Redirecting to payment...',
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then(() => {
          window.open('https://google.com');
        });
      }

      if (result.dismiss == Swal.DismissReason.esc || result.dismiss == Swal.DismissReason.backdrop) {
      }
    });
  }

  removeTicket() {
    this.numOfTickets--;
    this.totalPrice -= this.movie!.price;
  }
  addTicket() {
    this.numOfTickets++;
    this.totalPrice += this.movie!.price;
  }
}
