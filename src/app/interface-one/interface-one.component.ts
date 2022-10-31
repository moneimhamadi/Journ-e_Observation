import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-interface-one',
  templateUrl: './interface-one.component.html',
  styleUrls: ['./interface-one.component.css'],
  providers: [DatePipe],
})
export class InterfaceOneComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  multiple!: boolean;
  receivedUser!: User;
  user: User = new User();
  selectedImageUser = null;
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    gender: new FormControl(''),
    birthday: new FormControl('', Validators.required),
    photo: new FormControl(''),
  });
  constructor(private serviceUser: UserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.serviceUser.getUser().subscribe((res) => {
      console.log(res);
      this.receivedUser = res;
      this.userForm = new FormGroup({
        first_name: new FormControl(
          this.receivedUser.first_name,
          Validators.required
        ),
        last_name: new FormControl(
          this.receivedUser.last_name,
          Validators.required
        ),
        email: new FormControl(this.receivedUser.email, Validators.required),
        birthday: new FormControl(
          this.receivedUser.birthday,
          Validators.required
        ),
      });
    });
  }

  updateUser() {
    this.mapFormToUser();
    console.log(this.user);
    if (this.userForm.invalid) {
      alert('Verifier tout les champs');
    } else {
      this.serviceUser.updateUser(this.user).subscribe(
        (res) => {
          console.log(res);
          alert("L'utilisateur a été mofié(e) avec succés");
        },
        (error) => {
          alert('ERROR WHILE MODIFYING USER');
        }
      );
    }
  }
  mapFormToUser() {
    this.user.username = 'test';
    this.user.first_name = this.userForm.value.first_name;
    this.user.last_name = this.userForm.value.last_name;
    this.user.email = this.userForm.value.email;
    this.user.birthday = this.userForm.value.birthday;
    this.user.gender = 'M';
  }
  onSelectImageUser(event: any) {
    if (event.target.files[0].size > 500000) {
      alert('taille trés grand');
    } else {
      this.selectedImageUser = event.target.files[0];
    }
  }

  openFileSelectDialog() {
    this.fileInput.nativeElement.click();
  }
}
