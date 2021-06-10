import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../services/token-storage.service';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  form: any = {};
  isSuccessful = false;
  isEditFailed = false;
  errorMessage = '';
  isEditMode = false;

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService) {
  }

  ngOnInit(): void {
    const userDetails = this.tokenStorageService.getUserDetails();
    if (!userDetails) {
      window.location.replace('/home');
    } else {
      this.userService.getById(userDetails.id).subscribe(
        data => {
          this.user = data;
          this.syncFormWithUser();
        }
      );
    }
  }

  onSubmit(): void {
    const toUpdate: User = {
      id: this.user.id,
      username: this.user.username,
      email: this.user.email
    };
    toUpdate.name = this.form.name;
    toUpdate.surname = this.form.surname;
    toUpdate.age = this.form.age;
    this.userService.update(toUpdate).subscribe(
      data => {
        this.user = data;
        this.syncFormWithUser();
        this.isSuccessful = true;
        this.isEditFailed = false;
        this.isEditMode = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isEditFailed = true;
      }
    );
  }

  turnOnEditMode(): void {
    this.isSuccessful = false;
    this.isEditFailed = false;
    this.isEditMode = true;
  }

  turnOffEditMode(): void {
    this.isEditMode = false;
  }

  syncFormWithUser(): void {
    this.form.id = this.user.id;
    this.form.username = this.user.username;
    this.form.email = this.user.email;
    this.form.name = this.user.name;
    this.form.surname = this.user.surname;
    this.form.age = this.user.age;
  }
}
