import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatInputModule, MatCardModule, RouterLink, MatButtonModule, MatCheckboxModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public email: string = '';
  public name: string = '';
  public password: string = '';
  public confirmPassword: string = '';
  private userService: UserService;
  public active: boolean = false;

  public constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance();
  }

  public updateEmail(e: any) {
    this.email = e.target.value;
  }

  public updateName(e: any) {
    this.name = e.target.value;
  }

  public updatePassword(e: any) {
    this.password = e.target.value;
  }

  public updateConfirmPassword(e: any) {
    this.confirmPassword = e.target.value;
  }

  public doSignup() {
    if (this.email == '') {
      Swal.fire({
        title: 'Error!',
        text: 'You must enter a valid email adress.',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }
    if (this.name == '') {
      Swal.fire({
        title: 'Error!',
        text: 'You must enter your name.',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }
    if (this.password == '') {
      Swal.fire({
        title: 'Error!',
        text: 'You must enter a password.',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }
    if (this.confirmPassword == '') {
      Swal.fire({
        title: 'Error!',
        text: 'You must confirm your password.',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }
    if (this.password != this.confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'Passwords dont match.',
        icon: 'error',
        confirmButtonText: 'I understand',
      });
      return;
    }

    try {
      this.userService.createUser({
        email: this.email,
        name: this.name,
        password: this.password,
        booked: [],
      });
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/login'], {
      relativeTo: this.route,
    });
  }

  public isActive() {
    if (this.active == false) this.active = true;
    else {
      !this.active;
    }
  }
}
