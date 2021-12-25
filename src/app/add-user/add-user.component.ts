import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudService} from "../services/crud.service";
import {Permissions, User} from "../interfaces/user-model";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private crudService: CrudService, private formBuilder: FormBuilder) {
    this.formGroup = new FormGroup({
    });
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
    return this.formGroup.get("name_input")?.value;
  }

  get surname(): string {
    return this.formGroup.get("surname_input")?.value;
  }

  get can_read_users(): boolean {
    return this.formGroup.get("can_read_users")?.value;
  }

  get can_create_users(): boolean {
    return this.formGroup.get("can_create_users")?.value;
  }

  get can_update_users(): boolean {
    return this.formGroup.get("can_update_users")?.value;
  }

  get can_delete_users(): boolean {
    return this.formGroup.get("can_delete_users")?.value;
  }

  create(): void {
    if(!this.formGroup.valid) {
      alert("Please fill in the fields correctly.");
      return;
    }
    //let encodedPassword: string = btoa(this.password);
    let permissions: Permissions = new Permissions(this.can_read_users, this.can_create_users, this.can_update_users, this.can_delete_users);
    let user: User = {
      email: this.email,
      password: this.password,
      name: this.name,
      surname: this.surname,
      permissionListDTO: permissions
    }
    console.log(user);
    this.crudService.createUser(user).subscribe(
      (response => {
        console.log("Success... I think");
        console.log(response);
      }),
      (error => {
        alert(error);
      })
    );
  }

}
