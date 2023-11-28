import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from 'primeng/button';
import { ICategInitial, ICategory } from 'src/app/core/models/category.model';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { isHexaColor } from 'src/app/shared/validators/is-hexa-color.validator';
import { EnableToast } from 'src/app/core/stores/global/global.action';
import { Store } from '@ngxs/store';
import { StubCategoryBuilder } from 'src/app/core/models/builder/category.builder';
import { RetrieveAllCategs } from 'src/app/core/stores/category/category.action';
import { Observable, map, of, take } from 'rxjs';
import { CategGateway } from 'src/app/core/ports/categ.gateway';
import { AsyncValidatorsService } from 'src/app/shared/validators/asyn.validator';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-categ-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ColorPickerModule,
    ButtonModule
  ],
  templateUrl: './categ-form.component.html',
  styleUrls: ['./categ-form.component.scss']
})
export class CategFormComponent implements OnInit {
  private asyncValidatorService = inject(AsyncValidatorsService)
  private toastService = inject(ToastService)

  // private store = inject(Store)
  @Input({ required: true }) initialValues: ICategInitial
  @Output() submit: EventEmitter<ICategory> = new EventEmitter<ICategory>()
  @Output()reset: EventEmitter<void> = new EventEmitter<void>()

  form: FormGroup

  ngOnInit(): void {
    console.log(this.initialValues.color)
    this.form = new FormGroup({
      name: new FormControl<string|null>(this.initialValues.name, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        asyncValidators: [this.isNameAlreadyExist(this.initialValues.id)],
        updateOn: 'blur'
      }),
      infos: new FormControl<string|null>(this.initialValues.infos, [ Validators.maxLength(200)]),
      color: new FormControl<string|null>(this.initialValues.color, [ Validators.required, Validators.pattern("^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$")])
    })
  }

  onSubmit() {
    this.form.markAllAsTouched()
    if(!this.form.valid) {
      this.toastService.infoMsg('Error! please verified the fields')
      return
    }
    else {
      const newCateg =  this.buildNewCateg(this.form)
      this.submit.emit(newCateg)
    }
  }

  private isNameAlreadyExist(id: number): AsyncValidatorFn {
    return this.asyncValidatorService.isNameCategAlreadyExist(id)
  }

  private buildNewCateg(form: FormGroup): ICategory {
    return new StubCategoryBuilder()
      .withId(this.initialValues.id)
      .withName(form.controls['name'].value)
      .withColor(form.controls['color'].value)
      .withInfos(form.controls['infos'].value)
      .build()
  }
}
