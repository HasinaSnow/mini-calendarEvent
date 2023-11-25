import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IEvent, IEventLabels } from 'src/app/core/models/event.model';
import { EventLabelHelper } from 'src/app/shared/helpers/event-label.helper';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RetrievOneEvent } from 'src/app/core/stores/event/event.action';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  private store: Store = inject(Store)
  private route: ActivatedRoute = inject(ActivatedRoute)
  eventDetails: Signal<IEvent| undefined> = toSignal(this.store.select(store => store.event.oneEvent))
  eventLabels: IEventLabels = EventLabelHelper.getEventLabels()

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.store.dispatch(new RetrievOneEvent(id))
    });
  }

}
