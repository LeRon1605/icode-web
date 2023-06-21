import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CompareValidator(field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fieldToCompare = control.parent?.get(field);
      return (fieldToCompare?.value != control.value) ? {'compare': {value: control.value}} : null;
    };
}