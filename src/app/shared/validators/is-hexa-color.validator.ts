import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

const hexClrPattern = "^#([a-fA-F0-9]){3}$|[a-fA-F0-9]{6}$"

export function isHexaColor(): ValidatorFn {
    return ((control: AbstractControl): ValidationErrors|null => {
        if(!control.value) return null
        return !Validators.pattern(hexClrPattern) ? null : { isNotHexa: true }
    })
}