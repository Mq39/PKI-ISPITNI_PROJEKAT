import { NgIf } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookedModel, ReviewModel, UserModel } from '../../models/user.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, NgIf, MatTableModule, HttpClientModule, MatSortModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private userService: UserService;

  public active: UserModel | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userService = UserService.getInstance();
  }

  ngOnInit(): void {
    try {
      this.active = this.userService.getCurrentUser();

      if (this.active.booked.length == 0) return;
    } catch (e) {
      this.router.navigate(['/login'], {
        relativeTo: this.route,
      });
    }
  }

  public getAvatarUrl() {
    return 'https://ui-avatars.com/api/?name=' + this.active?.name;
  }

  public doLogout() {
    this.userService.logout();
    this.router.navigate(['/'], {
      relativeTo: this.route,
    });
  }

  public doPasswordChange() {
    //@ts-ignore
    Swal.fire({
      title: 'Enter your new password',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Change password',
      showLoaderOnConfirm: true,
      preConfirm: async (newPassword: string) => {
        try {
          this.userService.changePassword(newPassword);
        } catch (error) {
          //@ts-ignore
          Swal.showValidationMessage('Failed to change password');
        }
      },
      //@ts-ignore
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result: any) => {
      if (result.isConfirmed) {
        //@ts-ignore
        Swal.fire({
          title: 'Success',
          text: 'Your password has been changed successfully',
          icon: 'info',
        });
      }
    });
  }

  public announceSortChange(sortState: Sort) {
    if (!sortState.active || sortState.direction === '') {
      return;
    }

    const data = this.active?.booked.slice();
    const isAsc = sortState.direction === 'asc';
  }

  private compare(a: string, b: string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //   public doLikeButton(id: number) {
  //     for (let item of this.active!.booked) {
  //       if (item.id == id) {
  //         // Is liked
  //         if (item.review == ReviewModel.LIKED) {
  //           item.review = ReviewModel.NONE;
  //           return;
  //         }

  //         // Is Not liked
  //         item.review = ReviewModel.LIKED;
  //       }
  //     }

  //     console.log(this.active);
  //     this.userService.updateUser(this.active!);
  //   }

  //   public doDislikeButton(id: number) {
  //     for (let item of this.active!.booked) {
  //       if (item.id == id) {
  //         // Is disliked
  //         if (item.review == ReviewModel.DISLIKED) {
  //           item.review = ReviewModel.NONE;
  //           return;
  //         }

  //         // Is Not Disliked
  //         item.review = ReviewModel.DISLIKED;
  //       }
  //     }

  //     this.userService.updateUser(this.active!);
  //   }
}
