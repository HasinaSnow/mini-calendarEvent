import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private headerTitle: WritableSignal<string> = signal('HeaderTitle')

  setHeaderTitle(title: string): void {
    this.headerTitle.set('Event')
  }

  getHeaderTitle(): WritableSignal<string> {
    return this.headerTitle
  }

  constructor() { }
}
