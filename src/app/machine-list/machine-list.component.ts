import { Component, OnInit } from '@angular/core';
import {PERMISSION_REPRESENTATIONS} from "../model/permission-model";
import {Observer} from "rxjs";
import {Machine, MachineOperation, MachinePage, StateChangeMessage} from "../model/machine-model";
import {AuthenticationService} from "../services/authentication.service";
import {MachineManagementService} from "../services/machine-management.service";
import {ListenerService} from "../services/listener.service";

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.css']
})
export class MachineListComponent implements OnInit {

  machines: Machine[] = [];
  current_page: number = 0;
  total_pages: number = 0;
  page_numbers: number[] = [];

  name_filter: string = '';
  from_filter: string = '';
  to_filter: string = '';
  stopped: boolean = true;
  running: boolean = true;

  constructor(private authenticationService: AuthenticationService,
              private machineManagementService: MachineManagementService,
              private listenerService: ListenerService) {
    this.refresh();
    const stateChangeObserver: Observer<StateChangeMessage> = {
      next: response => {
        for(const machine of this.machines) {
          if(machine.machineId === response.machineId) {
            machine.statusSet = response.status;
          }
        }
      },
      error: err => alert(err),
      complete: () => {}
    }
    this.listenerService.receiveMessages().subscribe(stateChangeObserver);
  }

  ngOnInit(): void {
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

  get can_destroy_machines(): boolean {
    return this.authenticationService.permissions[PERMISSION_REPRESENTATIONS[9]];
  }

  refresh(): void {
    this.selectPage(this.current_page);
  }

  selectPage(page: number): void {
    const listObserver: Observer<MachinePage> = {
      next: response => {
        this.machines = response.content;
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
    const date_from: Date | undefined = this.from_filter === '' ? undefined : new Date(this.from_filter);
    const date_to: Date | undefined = this.to_filter === '' ? undefined : new Date(this.to_filter);
    this.machineManagementService.searchMachines(this.name_filter, date_from, date_to, this.stopped, this.running, page, 9).subscribe(listObserver);
  }

  nextPage(): void {
    this.selectPage(this.current_page + 1);
  }

  prevPage(): void {
    this.selectPage(this.current_page - 1);
  }

  executeOperation(machine: Machine, machineOperation: MachineOperation): void {
    const operateObserver: Observer<void> = {
      next: () => {},
        error: err => alert(err),
        complete: () => {}
    }
    this.machineManagementService.executeOperation(machine, machineOperation).subscribe(operateObserver);
  }

  confirmDestroy(machine: Machine): void {
    if(confirm("Are you sure you want to delete this machine?")) {
      this.destroyMachine(machine);
    }
  }

  destroyMachine(machine: Machine): void {
    const deleteObserver: Observer<void> = {
      next: () => {},
      error: err => alert(err),
      complete: () => {
        const index: number = this.machines.indexOf(machine, 0);
        this.machines.splice(index, 1);
      }
    }
    this.machineManagementService.destroyMachine(machine).subscribe(deleteObserver);
  }

}
