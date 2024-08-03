import {AbstractControl, ValidationErrors, Validator, ValidatorFn, Validators} from "@angular/forms";

export class CustomValidator{
  public static get isBlank(): ValidatorFn{
    return function validate(control: AbstractControl): ValidationErrors | null {
      const value = control.value;
      const errors: ValidationErrors = {};
      if(!value || value && !value.trim.length){
        errors['blank'] = true;
      }
      return errors;
    }
  }



}
