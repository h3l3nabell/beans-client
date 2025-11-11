import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private readonly hubConnection: HubConnection;

  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7023/stockHub')
      .build();
  }

  getHubConnection(): HubConnection {
    return this.hubConnection;
  }

  async connect(): Promise<void> {
    try {
      await this.hubConnection.start();
      console.log('✅ SignalR connected successfully');
      console.log('Connection ID:', this.hubConnection.connectionId);
      console.log('Connection state:', this.hubConnection.state);
    } catch (error) {
      console.error('❌ SignalR connection error:', error);
    }
  }
}
