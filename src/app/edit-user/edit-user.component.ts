import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CrudService} from "../services/crud.service";
import {PermissionList, User} from "../interfaces/user-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private crudService: CrudService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.formGroup = new FormGroup({
    });
    this.route.queryParams
      .subscribe(params => {
        this.crudService.showUser(params.id).subscribe(response => {
          this.formGroup.patchValue({
            email_input: response.email,
            name_input: response.name,
            surname_input: response.surname,
            can_read_users: response.permissionList.can_read_users,
            can_create_users: response.permissionList.can_create_users,
            can_update_users: response.permissionList.can_update_users,
            can_delete_users: response.permissionList.can_delete_users
          })
        });
      });
  }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      email_input: ['', Validators.email],
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

  editUser(): void {
    if(!this.formGroup.valid) {
      alert('Please fill in the fields correctly.');
      return;
    }
    this.route.queryParams
      .subscribe(params => {
        const permissionList = new PermissionList([this.can_read_users, this.can_create_users, this.can_update_users, this.can_delete_users]);
        const newUser = new User(params.id, this.email, '', this.name, this.surname, permissionList);
        this.crudService.editUser(params.id, newUser).subscribe(
          (() => {
            this.router.navigate(['list']);
          }),
          (error => {
            alert(error);
          })
        );
      });
  }

}
