import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CompatClient, Stomp} from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { environment } from '@environments/environment'
import {StateChangeMessage} from "@model/machine-model";

@Injectable({
  providedIn: 'root'
})
export class ListenerService {

  // @ts-ignore
  private stompClient: CompatClient;

  private topic: string = "";
  private isConnected: boolean = false;
  private messageSubject: Subject<StateChangeMessage> = new Subject<StateChangeMessage>();

  constructor() { }

  receiveMessages(): Observable<StateChangeMessage> {
    return this.messageSubject;
  }

  connect(token: string, topic: string): void {
    const socket = new SockJS(environment.apiUrl + "/ws?token=" + token);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, this.onConnect.bind(this));
    this.topic = topic;
  }

  onConnect(): void {
    this.stompClient.subscribe("/topic/" + this.topic, this.addNewMessage.bind(this));
    this.isConnected = true;
  }

  addNewMessage(messageOutput: any) {
    const message: StateChangeMessage = JSON.parse(messageOutput.body);
    this.messageSubject.next(message);
  }

  disconnect(): void {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.topic = "";
    this.isConnected = false;
  }
}
