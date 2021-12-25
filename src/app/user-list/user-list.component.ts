import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user-model";
import {CrudService} from "../services/crud.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  page: number = 0;

  constructor(private crudService: CrudService) {
    this.nextPage();
  }

  ngOnInit(): void {
  }

  selectPage(page: number): void {
    this.crudService.listUsers(page).subscribe((response => {
      this.users = response.content;
      this.page = page + 1;
    }));
  }

  nextPage(): void {
    this.crudService.listUsers(this.page).subscribe((response => {
      console.log(response);
      this.users = response.content;
      console.log(this.users[0].permissionList);
      this.page += 1;
    }));
  }

}
