import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isDateValidator(): ValidatorFn {
    return ((control: AbstractControl): ValidationErrors|null => {
        if(!control.value) return null
        return !control.value ? null : { isDate: true }
    })
}