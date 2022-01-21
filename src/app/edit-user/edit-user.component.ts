import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CrudService} from "../services/crud.service";
import {User} from "../model/user-model";
import {Observer} from "rxjs";
import {PERMISSION_REPRESENTATIONS} from "../model/permission-model";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formGroup: FormGroup;
  private id: number;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService) {
    this.formGroup = new FormGroup({});
    this.id = -1;
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.crudService.viewUser(this.id).subscribe(response => {
        this.formGroup.patchValue({
          email_input: response.email,
          name_input: response.name,
          surname_input: response.surname,
          can_read_users: response.permissionList[PERMISSION_REPRESENTATIONS[1]],
          can_create_users: response.permissionList[PERMISSION_REPRESENTATIONS[0]],
          can_update_users: response.permissionList[PERMISSION_REPRESENTATIONS[2]],
          can_delete_users: response.permissionList[PERMISSION_REPRESENTATIONS[3]]
        });
      })
    })
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
    if(this.id === -1) {
      alert('Please wait until we fetch needed information.');
      return;
    }
    if (!this.formGroup.valid) {
      alert('Please fill in the fields correctly.');
      return;
    }
    const newUser = User.fromTemplate(this.id, this.email, '', this.name, this.surname,
      this.can_read_users, this.can_create_users, this.can_update_users, this.can_delete_users);
    const editObserver: Observer<void> = {
      next: () => {
      },
      error: err => alert(err),
      complete: () => {
        this.router.navigate(['list']).then(() => {
        });
      }
    }
    this.crudService.editUser(newUser.userId, newUser).subscribe(editObserver);
  }
}
