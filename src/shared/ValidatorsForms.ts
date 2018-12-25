import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './CustomValidators';

export class ValidatorsForms {

    static userFormGroup(formBuilder: FormBuilder): FormGroup {
        return formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, CustomValidators.email()]],
            phone: ['', [Validators.required, CustomValidators.phone()]],
            addresses: formBuilder.group({
              state: ['', [Validators.required]],
              city: ''
            }),
          });
    }
}
