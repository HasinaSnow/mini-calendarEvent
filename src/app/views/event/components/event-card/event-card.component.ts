import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEventCard, IEventLabels } from 'src/app/core/models/event.model';
import { EventLabelHelper } from 'src/app/shared/helpers/event-label.helper';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event: IEventCard;
  @Output() eventClicked: EventEmitter<number> = new EventEmitter<number>();
  eventLabels: IEventLabels = EventLabelHelper.getEventLabels()

  emitEventId() {
    this.eventClicked.emit(this?.event.id);
  }

}
