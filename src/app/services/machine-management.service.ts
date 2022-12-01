import {Injectable} from '@angular/core';
import {formatDate} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import { environment } from '@environments/environment'
import {
  Machine,
  MachineCreateRequest,
  MachineData,
  MachineOperation,
  MachinePage,
  MachinePageResponse
} from "@model/machine-model";

@Injectable({
  providedIn: 'root'
})
export class MachineManagementService {

  private machineUrl: string = '/machine';
  private searchUrl: string = '/search';
  private createUrl: string = '/create';
  private startUrl: string = '/start';
  private stopUrl: string = '/stop';
  private restartUrl: string = '/restart';
  private destroyUrl: string = '/destroy';

  constructor(private httpClient: HttpClient) { }

  createMachine(machineCreateRequest: MachineCreateRequest): Observable<Machine> {
    const url: string = environment.apiUrl + this.machineUrl + this.createUrl;
    return this.httpClient.post<MachineData>(url, machineCreateRequest).pipe<Machine>(map(response => {
      return Machine.fromResponse(response);
    }));
  }

  searchMachines(name_filter: string, from_filter: Date | undefined, to_filter: Date | undefined, stopped: boolean, running: boolean, page: number, size: number): Observable<MachinePage> {
    let url: string = environment.apiUrl + this.machineUrl + this.searchUrl + '?page=' + page + '&size=' + size;
    if(name_filter.trim() != '') {
      url += '&';
      url += 'name=' + name_filter;
    }
    if(from_filter !== undefined && to_filter !== undefined) {
      url += '&';
      const from: string = formatDate(from_filter as Date, 'dd-MM-yyyy', 'en_US');
      const to: string = formatDate(to_filter as Date, 'dd-MM-yyyy', 'en_US');
      url += 'dateFrom=' + from + '&dateTo=' + to;
    }
    if(!stopped || !running) {
      url += '&';
      url += 'status=';
      if(stopped) {
        url += 'STOPPED';
      }
      if(running) {
        url += 'RUNNING';
      }
      if(!stopped && !running) {
        url += 'NONE';
      }
    }
    return this.httpClient.get<MachinePageResponse>(url).pipe<MachinePage>(map(response => {
      const machines: Machine[] = [];
      for(const machineResponse of response.content) {
        machines.push(Machine.fromResponse(machineResponse));
      }
      const machinePage: MachinePage = {
        content: machines,
        totalPages: response.totalPages
      }
      return machinePage;
    }))
  }

  urlForOperation(machineOperation: MachineOperation): string {
    if(machineOperation === MachineOperation.START) return this.startUrl;
    if(machineOperation === MachineOperation.STOP) return this.stopUrl;
    if(machineOperation === MachineOperation.RESTART) return this.restartUrl;
    return '';
  }

  executeOperation(machine: Machine, machineOperation: MachineOperation): Observable<void> {
    const url: string = environment.apiUrl + this.machineUrl + this.urlForOperation(machineOperation)
      + '/' + machine.machineId
    return this.httpClient.get<void>(url);
  }

  scheduleOperation(machine: Machine, machineOperation: MachineOperation, cron: string): Observable<void> {
    const cronParam = cron.split(' ').join('%20');
    const url: string = environment.apiUrl + this.machineUrl + this.urlForOperation(machineOperation)
      + '/' + machine.machineId
      + '?cron=' + cronParam;
    return this.httpClient.get<void>(url);
  }

  destroyMachine(machine: Machine): Observable<void> {
    const url: string = environment.apiUrl + this.machineUrl + this.destroyUrl + '/' + machine.machineId;
    return this.httpClient.delete<void>(url);
  }
}
