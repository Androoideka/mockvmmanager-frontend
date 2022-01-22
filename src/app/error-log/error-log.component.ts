import { Component, OnInit } from '@angular/core';
import {ErrorLog, ErrorLogPage} from "../model/error-model";
import {Observer} from "rxjs";
import {ErrorService} from "../services/error.service";

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {

  errors: ErrorLog[] = [];
  current_page: number = 0;
  total_pages: number = 0;
  page_numbers: number[] = [];

  constructor(private errorService: ErrorService) {
    this.refresh();
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.selectPage(this.current_page);
  }

  selectPage(page: number): void {
    const listObserver: Observer<ErrorLogPage> = {
      next: response => {
        this.errors = response.content;
        this.total_pages = response.totalPages;
        this.page_numbers = [];
        for(let i = 0; i < this.total_pages; i++) {
          this.page_numbers.push(i);
        }
        this.current_page = page;
      },
      error: err => alert(err),
      complete: () => {}
    }
    this.errorService.listErrors(page).subscribe(listObserver);
  }

  nextPage(): void {
    this.selectPage(this.current_page + 1);
  }

  prevPage(): void {
    this.selectPage(this.current_page - 1);
  }

}
