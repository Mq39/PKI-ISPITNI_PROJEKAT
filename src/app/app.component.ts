import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { UserModel } from '../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public isLoggedIn: boolean = false;
  public active: UserModel | null = null;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.checkUserStatus();
    this.active = this.userService.getCurrentUser();
  }

  checkUserStatus() {
    this.isLoggedIn = this.userService.hasCurrentUser();
  }

  logout() {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.logout();
        this.isLoggedIn = false;
        this.router.navigate(['/home']);
      }
    });
  }

  public getAvatarUrl() {
    return 'https://ui-avatars.com/api/?name=' + this.active?.name;
  }
}
