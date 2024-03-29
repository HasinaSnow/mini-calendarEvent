import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent, IEventInitial } from 'src/app/core/models/event.model';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { EditEvent, RetrievOneEvent } from 'src/app/core/stores/event/event.action';
import { EventFormComponent } from '../../components/event-form/event-form.component';
import { EVENT_ROUTE } from 'src/app/shared/values/default-routes.values';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [
    CommonModule,
    EventFormComponent
  ],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  private store: Store = inject(Store)
  private route: ActivatedRoute = inject(ActivatedRoute)
  private router: Router = inject(Router)

  initialValues: IEventInitial

  ngOnInit() {
    // get the id in url
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new RetrievOneEvent(id))
    })
    this.store.select(store => store.event.oneEvent).subscribe((event: IEvent) => {
      this.initialValues = event 
      this.initialValues = { ...event, date: new Date(event.date) }
    })
  }

  onSubmit(event: IEvent) {
    this.store.dispatch(new EditEvent(event))
    this.router.navigate([EVENT_ROUTE.path])
  }

  onReset() {
    console.log('form reset')
  }
}
