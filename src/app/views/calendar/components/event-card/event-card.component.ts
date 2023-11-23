import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEventCard, IEventLabels } from 'src/app/core/models/event.model';
import { ILabel } from 'src/app/core/models/label.model';
import { CATEG_EVENT_LABEL, CONFIRMED_EVENT_LABEL, CUSTOMER_EVENT_LABEL, DATE_EVENT_LABEL, NOT_CONFIRMED_EVENT_LABEL, PLACE_EVENT_LABEL } from 'src/app/shared/values/default-labels.values';
import { EventLabelHelper } from 'src/app/shared/helpers/event-label.helper';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent {
  @Input() event: IEventCard;
  @Output() eventClicked: EventEmitter<number> = new EventEmitter<number>();
  eventLabels: IEventLabels = EventLabelHelper.getEventLabels()

  emitEventId() {
    this.eventClicked.emit(this?.event.id);
  }
}
