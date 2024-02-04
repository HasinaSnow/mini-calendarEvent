import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent, IEventInitial } from 'src/app/core/models/event.model';
import { Store } from '@ngxs/store';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { INITIAL_EVENT_VALUE } from 'src/app/shared/values/initial-event.values';
import { AddNewEvent } from 'src/app/core/stores/event/event.action';
import { Router } from '@angular/router';
import { HOME_ROUTE } from 'src/app/shared/values/default-routes.values';

@Component({
  selector: 'app-event-new',
  standalone: true,
  imports: [CommonModule, EventFormComponent],
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  private store: Store = inject(Store)
  private router: Router = inject(Router)

  initialValues: IEventInitial
  dateSelected: Date

  ngOnInit(): void {
    this.store.select(state => state.calendar.fullDateSelected).subscribe(date => this.dateSelected = date)
    this.initialValues = { ...INITIAL_EVENT_VALUE, date: this.dateSelected }
  }

  onSubmit(newEvent: IEvent) {
    this.store.dispatch(new AddNewEvent(newEvent))
    this.router.navigate([HOME_ROUTE.path])
  }

  onReset() {
    console.log('reseted')
  }

}
