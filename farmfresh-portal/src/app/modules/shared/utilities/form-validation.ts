import { Injectable } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { css_classes } from "./css_classes";

@Injectable({
  providedIn: "root",
})

export class FormValidationService {
  constructor() {}
  validateForm(
    abstractControl: AbstractControl,
    key: any,
    formErrors: any,
    validationMessages: any
  ): void {
    formErrors[key] = "";
    const element = document.getElementById(key);
    if (
      abstractControl &&
      !abstractControl.valid &&
      (abstractControl.touched || abstractControl.dirty)
    ) {
      const message = validationMessages[key];
      const parentElement = element?.parentElement;
      for (const errorKey in abstractControl.errors) {
        formErrors[key] += message[errorKey] + " ";
      }
      if (parentElement?.classList.contains(css_classes.div.hasSuccess)) {
        parentElement.classList.remove(css_classes.div.hasSuccess);
      }
      if (!parentElement?.classList.contains(css_classes.div.hasDanger)) {
        parentElement?.classList.contains(css_classes.div.hasDanger);
      }
      if (element?.classList.contains(css_classes.input.isValid)) {
        element.classList.remove(css_classes.input.isValid);
      }
      if (!element?.classList.contains(css_classes.input.isInvalid)) {
        element?.classList.add(css_classes.input.isInvalid);
      }
    } else if (abstractControl && abstractControl.valid) {
      const parentElement = element?.parentElement;
      if (parentElement?.classList.contains(css_classes.div.hasDanger)) {
        parentElement.classList.remove(css_classes.div.hasDanger);
      }
      if (!parentElement?.classList.contains(css_classes.div.hasSuccess)) {
        parentElement?.classList.contains(css_classes.div.hasSuccess);
      }
      if (element?.classList.contains(css_classes.input.isInvalid)) {
        element.classList.remove(css_classes.input.isInvalid);
      }
      if (!element?.classList.contains(css_classes.input.isValid)) {
        element?.classList.add(css_classes.input.isValid);
      }
    }
  }
}

export const getControlName = (c: AbstractControl): string | null => {
  const formGroup : any = c.parent?.controls;
  return Object.keys(formGroup!).find((name) => c === formGroup[name]) || null;
};

export const whiteSpaceCheck = (fc: FormControl) => {
  const isWhitespace = (fc.value || "").trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { whitespace: true };
};

  // custom validator to check that two fields match
  export const mustMatch = (controlName: string, matchingControlName: string) => {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors[0].mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }