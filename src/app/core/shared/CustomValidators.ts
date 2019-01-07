/*
Chi Thien TCN
Email: chithien994@gmail.com
Custom validators for Reactive Angular Forms
*/
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms'; // Interface

export class CustomValidators {
    static email = (): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: string } => {
            const result = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(control.value);
            return result === true ? null : { 'error': 'Wrong email format' };
        };
    }
    static phone = (): ValidatorFn => {
        return (control: AbstractControl): { [key: string]: string } => {
            const result = /^[0-9]{10,15}$/i.test(control.value);
            return result === true ? null : { 'error': 'Wrong phone format' };
        };
    }
}
