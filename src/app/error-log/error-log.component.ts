import { Component, OnInit } from '@angular/core';
import {ErrorLog, ErrorLogPage} from "../model/error-model";
import {Observer} from "rxjs";
import {ErrorService} from "../services/error.service";
import {Machine, MachinePage} from "../model/machine-model";
import {MachineManagementService} from "../services/machine-management.service";
import {AuthenticationService} from "../services/authentication.service";
import {PERMISSION_REPRESENTATIONS} from "../model/permission-model";

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
              private machineManagementService: MachineManagementService,
              private authenticationService: AuthenticationService) {
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
    if(this.can_start_machines) {
      this.selectedOperation = '0';
    } else if(this.can_stop_machines) {
      this.selectedOperation = '1';
    } else {
      this.selectedOperation = '2';
    }
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

  get no_operation_permissions(): boolean {
    return !this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[5]]
      && !this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[6]]
      && !this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[7]]
  }

  get can_start_machines(): boolean {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[5]];
  }

  get can_stop_machines(): boolean {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[6]];
  }

  get can_restart_machines(): boolean {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[7]];
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
