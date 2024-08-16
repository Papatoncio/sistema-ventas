import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseForm {
  constructor() {}

  isValidForm(form: AbstractControl | null): boolean {
    let bandera = false;

    if (form) {
      bandera = form.touched || (form.dirty && form.invalid);
    }

    return bandera;
  }

  getErrorMessage(form: AbstractControl | null) {
    let message = '';

    if (form) {
      const { errors } = form;
      if (errors) {
        const messages: any = {
          required: 'Campo requerido',
          email: 'Formato Email Inválido',
          pattern: 'Formato inválido',
          minlength: `El mínimo de caracteres es ${
            errors['minlength'] ? errors['minlength'].requiredLength : ''
          }`,
          passwordsNoCoinciden: 'Las contraseñas no coinciden',
        };

        const errorKey = Object.keys(errors).find(Boolean);
        if (errorKey) message = messages[errorKey];
      }
    }
    return message;
  }
}
