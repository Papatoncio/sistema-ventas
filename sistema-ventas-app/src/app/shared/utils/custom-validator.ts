import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';

export class CustomValidator {
  static passwordsAreEqual(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const password = control.parent?.get('password')?.value;
    const confirmPassword = control.value;

    if (password !== confirmPassword) {
      return { passwordsNoCoinciden: true };
    }

    return null;
  }
}
