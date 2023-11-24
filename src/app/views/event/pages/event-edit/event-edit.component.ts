import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent, IEventInitial } from 'src/app/core/models/event.model';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { EditEvent, RetrievOneEvent } from 'src/app/core/stores/event/event.action';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventFormComponent } from '../../components/event-form/event-form.component';

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

  initialValues: IEventInitial 

  ngOnInit() {
    // get the id in url
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new RetrievOneEvent(id))
    })
    this.store.select(store => store.event.onEvent).subscribe(event => this.initialValues = event)
  }

  onSubmit(event: IEvent) {
    console.log('form valid')
    this.store.dispatch(new EditEvent(event))
  }

  onReset() {
    console.log('form reset')
  }
}
