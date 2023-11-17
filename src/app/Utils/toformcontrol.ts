import {FormArray, FormControl, FormGroup} from "@angular/forms";

type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

export type ToFormControl<T> = T extends Array<infer ArrayType> ? FormArray<ToFormControl<ArrayType>> : T extends object ? FormGroup<ToFormGroup<T>> : FormControl<T | null>
