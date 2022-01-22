import {formatDate} from "@angular/common";

export interface ErrorResponse {
  errorId: number,
  dateTime: string,
  machineName: string,
  message: string;
}

export interface ErrorPageResponse {
  content: ErrorResponse[],
  totalPages: number;
}

export class ErrorLog {
  static fromResponse(errorResponse: ErrorResponse) {
    const dateTime = new Date(errorResponse.dateTime);
    return new ErrorLog(errorResponse.errorId, dateTime, errorResponse.machineName, errorResponse.message);
  }

  constructor(public errorId: number,
              private dateTime: Date,
              public machineName: string,
              public message: string) {
  }

  get timestamp(): string {
    return formatDate(this.dateTime, 'dd.MM.yyyy, HH:mm:ss', 'en_GB');
  }
}

export interface ErrorLogPage {
  content: ErrorLog[],
  totalPages: number;
}
