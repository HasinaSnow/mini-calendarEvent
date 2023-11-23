import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { IConfirm, IEventCategory } from 'src/app/core/models/event.model';

@Component({
  selector: 'app-event-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule
  ],
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  confirmations: IConfirm[] = [
    { label: 'Confirmed', value: true, key: '#1' },
    { label: 'Pending', value: false, key: '#2' },
  ];

  categories: IEventCategory[] = [
    {
      id: 1,
      name: 'Mariage',
      color: 'blue',
    },
    {
      id: 2,
      name: 'Fiancaille',
      color: 'green',
    },
  ];

  form: FormGroup = new FormGroup({
    date: new FormControl<Date|null>(null, [ Validators.required]),
    confirmed: new FormControl<IConfirm|null>(null, [ Validators.required ]),
    category: new FormControl<IEventCategory|null>(null, [ Validators.required ]),
    place: new FormControl<string|null>('', [ Validators.required, Validators.min(3), Validators.max(40) ]),
    customer: new FormControl<string|null>('', [ Validators.required, Validators.min(3), Validators.max(40) ])
  });

  ngOnInit() {
    // if edition = type: Date
    //  { template: DateTemplate, }
  }

  onSubmit() {}
}
