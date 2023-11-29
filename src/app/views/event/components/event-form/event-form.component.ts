import { Component, EventEmitter, OnInit, Input, Output, Signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IEvent, IEventCategory, IEventConfirm, IEventInitial } from 'src/app/core/models/event.model';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { RetrieveAllCategs } from 'src/app/core/stores/category/category.action';
import { StubEventBuilder } from 'src/app/core/models/builder/event.builder';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { EnableToast } from 'src/app/core/stores/global/global.action';

@Component({
  selector: 'app-event-form',
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
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  private store: Store = inject(Store)
  allCategs: Signal<IEventCategory[]> = toSignal(this.store.select(store => store.category.allCategs))

  @Input({ required: true}) initialValues: IEventInitial
  @Input() submitBtn: string = 'Submit'
  @Output() submit: EventEmitter<IEvent> = new EventEmitter<IEvent>()
  @Output() reset: EventEmitter<void> = new EventEmitter<void>()

  confirmations: IEventConfirm[] = [
    { label: 'Confirmed', value: true, key: '#1' },
    { label: 'Pending', value: false, key: '#2' },
  ];
  form: FormGroup

  ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl<Date|null>(this.initialValues.date, [ Validators.required ]),
      category: new FormControl<IEventCategory|null>(this.initialValues.category, [ Validators.required, this.isCategoryValid() ]),
      place: new FormControl<string|null>(this.initialValues.place, [ Validators.required, Validators.minLength(3), Validators.maxLength(40) ]),
      customer: new FormControl<string|null>(this.initialValues.customer, [ Validators.required, Validators.minLength(3), Validators.maxLength(40) ]),
      confirmed: new FormControl<boolean|null>(this.initialValues.confirm, [ Validators.required ]),
      infos: new FormControl<string|null>(this.initialValues.infos, [Validators.maxLength(500)])
    });
  }

  private isCategoryValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors|null => {
      if(!control.value) return null
      if(typeof control.value === 'object') return null
      this.store.dispatch(new RetrieveAllCategs()) // get the last update of allCategs in ressources
      return this.allCategs().includes(control.value) ? null : { isCategory: true }
    }
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if(!this.form.valid) {
      console.log('form invalid')
      this.store.dispatch(new EnableToast({ key: 'tc', severity: 'error', summary: 'error', detail: 'Error! please verified the fields' }))
      return
    }
    else {
      const newEvent =  this.buildNewEvent(this.form)
      this.submit.emit(newEvent)
    }
  }

  private buildNewEvent(form: FormGroup): IEvent {
    return new StubEventBuilder()
      .withId(this.initialValues.id)
      .withDate(form.controls['date'].value)
      .withCateg(form.controls['category'].value)
      .withConfirmation(form.controls['confirmed'].value)
      .withPlace(form.controls['place'].value)
      .withCustomer(form.controls['customer'].value)
      .withInfos(form.controls['infos'].value)
      .build()
  }

}
