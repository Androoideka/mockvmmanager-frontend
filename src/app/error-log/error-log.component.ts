import { Component, OnInit } from '@angular/core';
import {ErrorLog, ErrorLogPage} from "../model/error-model";
import {Observer} from "rxjs";
import {ErrorService} from "../services/error.service";
import {Machine, MachinePage} from "../model/machine-model";
import {MachineManagementService} from "../services/machine-management.service";

@Component({
  selector: 'app-error-log',
  templateUrl: './error-log.component.html',
  styleUrls: ['./error-log.component.css']
})
export class ErrorLogComponent implements OnInit {

  machines: Machine[] = [];
  errors: ErrorLog[] = [];
  current_page: number = 0;
  total_pages: number = 0;
  page_numbers: number[] = [];

  selectedOperation: string;
  selectedMachine: Machine;
  cron0: string;
  cron1: string;
  cron2: string;
  cron3: string;
  cron4: string;
  cron5: string;

  constructor(private errorService: ErrorService,
              private machineManagementService: MachineManagementService) {
    const listObserver: Observer<MachinePage> = {
      next: response => {
        this.machines = response.content;
        this.selectedMachine = this.machines[0];
      },
      error: err => alert(err),
      complete: () => {}
    }
    this.machineManagementService.searchMachines('', undefined, undefined, true, true, 0, 999).subscribe(listObserver);
    this.refresh();
    this.selectedOperation = '0';
    this.selectedMachine = this.machines[0];
    this.cron0 = '*';
    this.cron1 = '*';
    this.cron2 = '*';
    this.cron3 = '*';
    this.cron4 = '*';
    this.cron5 = '*';
  }

  ngOnInit(): void {
  }

  get cron(): string {
    return this.cron0 + ' ' + this.cron1 + ' ' + this.cron2 + ' ' + this.cron3 + ' ' + this.cron4 + ' ' + this.cron5;
  }

  scheduleOperation(): void {
    this.machineManagementService.scheduleOperation(this.selectedMachine, Number(this.selectedOperation), this.cron);
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
