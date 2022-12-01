import { Component, OnInit } from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Observer} from "rxjs";
import {User} from "@model/user-model";
import {PERMISSION_REPRESENTATIONS} from "@model/permission-model";
import {CrudService} from "@services/crud.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formGroup: UntypedFormGroup;
  created: boolean;
  username: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private crudService: CrudService) {
    this.formGroup = new UntypedFormGroup({});
    this.created = false;
    this.username = "";
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email_input: ['', Validators.email],
      password_input: ['', Validators.required],
      name_input: ['', Validators.required],
      surname_input: ['', Validators.required],
      permission_array: this.formBuilder.array([])
    });
    for (const perm of PERMISSION_REPRESENTATIONS) {
      this.perm_form.push(this.formBuilder.control(false));
    }
  }

  get perm_form(): UntypedFormArray {
    return (this.formGroup.get('permission_array') as UntypedFormArray)
  }

  get PERMISSION_REPRESENTATIONS(): string[] {
    return PERMISSION_REPRESENTATIONS;
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

  get permissionValues(): boolean[] {
    return this.perm_form.value as boolean[];
  }

  createUser(): void {
    this.created = false;
    if(!this.formGroup.valid) {
      alert('Please fill in the fields correctly.');
      return;
    }
    //let encodedPassword: string = btoa(this.password);
    const user: User = User.fromTemplate(0, this.email, this.password, this.name, this.surname, this.permissionValues);
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
