import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {environment} from "../../environments/environment";
import {DtoOutputMessage} from "../Dtos/Groups/DtoOutputMessage";
import {DtoInputMessage} from "../Dtos/Groups/dto-input-message";
import {EventBusService} from "./EventBus/event-bus.service";
import {DtoInputGroup} from "../Dtos/Groups/dto-input-group";

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: signalR.HubConnection;
  constructor(private eb : EventBusService) {
    this.buildConnection();
    this.registerOnServerEvents();
  }
  private buildConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.BASE_URL_API + "/api/v1/message",{
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('ReceiveMessage', (group: DtoInputGroup) => {
      this.eb.emitEvent({
          Type: "RecevievedMessage",
          Payload: group
      })
    });
    this.hubConnection.on('DeletedMessage', (group: DtoInputGroup) => {
      this.eb.emitEvent({
        Type: "DeletedMessage",
        Payload: group
      })
    });
    this.hubConnection.on('UserHasJoin', (group: DtoInputGroup) => {
        this.eb.emitEvent({
            Type: "UserHasJoin",
            Payload: group
        });
    });
    this.hubConnection.on('UserHasLeft', (group: DtoInputGroup) => {
        this.eb.emitEvent({
            Type: "UserHasLeft",
            Payload: group
        })
    });
  }

  public startConnection = () => {
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }
  public sendMessageToGroup = (msg: DtoOutputMessage, group : DtoInputGroup) => {
    this.hubConnection.invoke('SendMessageToGroup', msg, group)
      .catch(err => console.error(err));
  }
  public addToNotifGroup = (groupName: string) => {
      this.hubConnection.invoke('AddToNotifGroup', groupName)
          .catch(err => console.error(err));
  }
  public removeFromNotifGroup = (groupName: string) => {
      this.hubConnection.invoke('RemoveFromNotifGroup', groupName)
          .catch(err => console.error(err));
  }

  public addToGroup = (group: DtoInputGroup) => {
      this.hubConnection.invoke('AddToGroup', group)
      .catch(err => console.error(err));
  }
  public removeFromGroup = (group: DtoInputGroup) => {
    this.hubConnection.invoke('RemoveFromGroup',  group)
      .catch(err => console.error(err));
  }
  messageRemoveFromGroup(group: DtoInputGroup) {
    this.hubConnection.invoke('RemoveMessageFromGroup', group)
      .catch(err => console.error(err));
  }
}
