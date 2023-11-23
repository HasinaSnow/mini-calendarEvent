import { Component, OnInit, Signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ICategory } from 'src/app/core/models/category.model';
import { IConfirm, IEvent } from 'src/app/core/models/event.model';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { RetrieveAllCategs } from 'src/app/core/stores/category/category.action';
import { AddNewEvent } from 'src/app/core/stores/event/event.action';
import { StubEventBuilder } from 'src/app/core/models/builder/event.builder';

@Component({
  selector: 'app-event-new',
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
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {
  private store: Store = inject(Store)

  confirmations: IConfirm[] = [
    { label: 'Confirmed', value: true, key: '#1' },
    { label: 'Pending', value: false, key: '#2' },
  ];

  fullDateSelected: Signal<Date> = toSignal(this.store.select(state => state.calendar.fullDateSelected))
  allCategs: Signal<ICategory[]> = toSignal(this.store.select(store => store.category.categories))

  form: FormGroup = new FormGroup({
    date: new FormControl<Date|null>(this.fullDateSelected(), [ Validators.required ]),
    category: new FormControl<ICategory|null>(null, [ Validators.required, this.isCategoryValid() ]),
    place: new FormControl<string|null>('', [ Validators.required, Validators.minLength(3), Validators.maxLength(40) ]),
    customer: new FormControl<string|null>('', [ Validators.required, Validators.minLength(3), Validators.maxLength(40) ]),
    confirmed: new FormControl<IConfirm|null>(null, [ Validators.required ]),
    infos: new FormControl<string|null>('', [Validators.maxLength(500)])
  });

  ngOnInit(): void {
  }

  private isCategoryValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors|null => {
      if(!control.value) return null
      if(typeof control.value === 'object') return null
      this.store.dispatch(new RetrieveAllCategs()) // get the last update of allCategs in ressources
      return this.allCategs().includes(control.value) ? null : { isCategory: true }
    }
  }

  private buildNewEvent(form: FormGroup): IEvent {
    return new StubEventBuilder()
      .withDate(form.controls['date'].value)
      .withCateg(form.controls['category'].value)
      .withConfirmation(form.controls['confirmed'].value)
      .withPlace(form.controls['place'].value)
      .withCustomer(form.controls['customer'].value)
      .withInfos(form.controls['infos'].value)
      .build()
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if(!this.form.valid) 
      return console.log('form invalid')

    console.log('form valid')
    const newEvent =  this.buildNewEvent(this.form)
    this.store.dispatch(new AddNewEvent(newEvent))
  }

  onReset() {
    this.form.reset()
    console.log('reseted')
  }

}
