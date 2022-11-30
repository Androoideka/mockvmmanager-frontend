import { Component, OnInit } from '@angular/core';
import {UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
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

  formGroup: UntypedFormGroup;
  private id: number;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private crudService: CrudService) {
    this.formGroup = new UntypedFormGroup({});
    this.id = -1;
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.crudService.viewUser(this.id).subscribe(response => {
        this.formGroup.patchValue({
          email_input: response.email,
          name_input: response.name,
          surname_input: response.surname,
          permission_array: response.permissionList.permissionValues
        });
      })
    })
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email_input: ['', Validators.email],
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

  get name(): string {
    return this.formGroup.get('name_input')?.value;
  }

  get surname(): string {
    return this.formGroup.get('surname_input')?.value;
  }

  get permissionValues(): boolean[] {
    return this.perm_form.value as boolean[];
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
    const newUser = User.fromTemplate(this.id, this.email, '', this.name, this.surname, this.permissionValues);
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
