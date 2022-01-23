import {formatDate} from "@angular/common";

export interface MachineCreateRequest {
  name: string;
}

export interface MachineData {
  machineId: number,
  name: string,
  created: string,
  status: string
}

export interface MachinePageResponse {
  content: MachineData[],
  totalPages: number;
}

export type Status = 'STOPPED' | 'RUNNING';

export enum MachineOperation {
  START,
  STOP,
  RESTART,
  DESTROY
}

export class Machine {
  static fromResponse(machineData: MachineData): Machine {
    const date: Date = new Date(machineData.created);
    const status: Status = machineData.status as Status;
    return new Machine(machineData.machineId, machineData.name, date, status);
  }

  constructor(public machineId: number,
              public name: string,
              private createdDate: Date,
              private statusEnum: Status) {
  }

  get created(): string {
    return formatDate(this.createdDate, 'dd.MM.yyyy, HH:mm:ss', 'en_GB');
  }

  get status(): string {
    const lower: string = this.statusEnum.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.substring(1);
  }

  set statusSet(value: Status) {
    this.statusEnum = value;
  }

  get running(): boolean {
    return this.statusEnum === 'RUNNING';
  }

  get stopped(): boolean {
    return this.statusEnum === 'STOPPED';
  }
}

export interface MachinePage {
  content: Machine[],
  totalPages: number;
}

export interface StateChangeMessage {
  machineId: number,
  status: Status;
}
