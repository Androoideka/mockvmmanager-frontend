import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudService} from "../services/crud.service";
import {User} from "../model/user-model";
import {Observer} from "rxjs";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formGroup: FormGroup;
  created: boolean;
  username: string;

  constructor(private formBuilder: FormBuilder,
              private crudService: CrudService) {
    this.formGroup = new FormGroup({});
    this.created = false;
    this.username = "";
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email_input: ['', Validators.email],
      password_input: ['', Validators.required],
      name_input: ['', Validators.required],
      surname_input: ['', Validators.required],
      can_read_users: [false],
      can_create_users: [false],
      can_update_users: [false],
      can_delete_users: [false]
    });
  }

  get email(): string {
    return this.formGroup.get('email_input')?.value;
  }

  get password(): string {
    return this.formGroup.get('password_input')?.value;
  }

  get name(): string {
    return this.formGroup.get('name_input')?.value;
  }

  get surname(): string {
    return this.formGroup.get('surname_input')?.value;
  }

  get can_read_users(): boolean {
    return this.formGroup.get('can_read_users')?.value;
  }

  get can_create_users(): boolean {
    return this.formGroup.get('can_create_users')?.value;
  }

  get can_update_users(): boolean {
    return this.formGroup.get('can_update_users')?.value;
  }

  get can_delete_users(): boolean {
    return this.formGroup.get('can_delete_users')?.value;
  }

  createUser(): void {
    this.created = false;
    if(!this.formGroup.valid) {
      alert('Please fill in the fields correctly.');
      return;
    }
    //let encodedPassword: string = btoa(this.password);
    const user: User = User.fromTemplate(0, this.email, this.password, this.name, this.surname,
      this.can_read_users, this.can_create_users, this.can_update_users, this.can_delete_users);
    const createObserver: Observer<void> = {
      next: () => {
      },
      error: err => alert(err),
      complete: () => {
        this.created = true;
        this.username = user.email;
      }
    }
    this.crudService.createUser(user).subscribe(createObserver);
  }

}
