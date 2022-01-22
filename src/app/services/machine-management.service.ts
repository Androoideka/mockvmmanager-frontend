import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class MachineManagementService {

  private apiUrl: string = 'http://localhost:8080';
  private machineUrl: string = '/machine';
  private searchUrl: string = '/search';
  private createUrl: string = '/create';
  private startUrl: string = '/start';
  private stopUrl: string = '/stop';
  private restartUrl: string = '/restart';
  private destroyUrl: string = '/destroy';

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService) { }
}
