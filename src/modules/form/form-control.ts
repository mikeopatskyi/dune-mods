import { EventEmitter } from '@form/event-emitter';
import { FormGroup } from '@form/form-group';

type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export class FormControl<T extends string | boolean | number> {
  private element?: FormElement | FormElement[];
  private initialValue: T;
  private _isValid: boolean = false;

  value: T;
  validators: ((value: T, formGroup?: FormGroup) => string | null)[] = [];
  asyncValidators: ((value: T, formGroup?: FormGroup) => Promise<string | null>)[] = [];
  isTouched: boolean = false;
  isDirty: boolean = false;
  isFocused: boolean = false;
  isPristine: boolean = true;
  isDisabled: boolean = false;
  valueChanges: EventEmitter<T> = new EventEmitter<T>();

  constructor(initialValue: T) {
    this.value = initialValue;
    this.initialValue = initialValue;
  }

  /**
   * Sets the value of the control and triggers validation.
   * @param value - The value to set.
   */
  setValue(value: T): void {
    this.value = value;
    this.isDirty = true;
    this.isPristine = false;

    // Update the associated HTML input element if it exists
    if (this.element) {
      const elementsToUpdate = Array.isArray(this.element) ? this.element : [this.element];

      elementsToUpdate.forEach((elem) => {
        if (
          elem instanceof HTMLInputElement ||
          elem instanceof HTMLTextAreaElement ||
          elem instanceof HTMLSelectElement
        ) {
          elem.value = String(value);
        }
      });
    }

    // Emit the value change here
    this.valueChanges.emit('valueChanges', String(value));

    this.validate();
  }

  /**
   * Assigns the specified validators to the control.
   * @param validators - The validators to set.
   */
  setValidators(validators: ((value: T, formGroup?: FormGroup) => string | null)[]): void {
    this.validators = validators;
    this._isValid = false;
    this.validate();
  }

  /**
   * Adds a regular expression validator to the control.
   * @param regex - The regular expression to test against.
   * @param errorMessage - The error message to return if validation fails.
   */
  addRegexValidator(regex: RegExp, errorMessage: string): void {
    this.validators.push((value: T) => (regex.test(String(value)) ? null : errorMessage));
    this._isValid = false;
    this.validate();
  }

  /**
   * Assigns the specified asynchronous validators to the control.
   * @param asyncValidators - The asynchronous validators to set.
   */
  setAsyncValidators(
    asyncValidators: ((value: T, formGroup?: FormGroup) => Promise<string | null>)[]
  ): void {
    this.asyncValidators = asyncValidators;
    this._isValid = false;
    this.validateAsync();
  }

  /**
   * Marks the control as touched.
   */
  markAsTouched(): void {
    this.isTouched = true;
  }

  /**
   * Marks the control as focused.
   */
  markAsFocused(): void {
    this.isFocused = true;
  }

  /**
   * Marks the control as untouched.
   */
  markAsUntouched(): void {
    this.isTouched = false;
  }

  /**
   * Marks the control as unfocused.
   */
  markAsUnfocused(): void {
    this.isFocused = false;
  }

  /**
   * Disables the control.
   */
  markAsDisabled(): void {
    this.isDisabled = true;
  }

  /**
   * Enables the control.
   */
  markAsEnabled(): void {
    this.isDisabled = false;
  }

  /**
   * Marks the control as having been interacted with by the user, typically by altering its value.
   */
  markAsDirty(): void {
    this.isDirty = true;
    this.isPristine = false; // If it's dirty, it's no longer pristine
  }

  /**
   * Validates the control using asynchronous validators.
   * @returns A promise resolving to a validation error message or null.
   */
  private async validateAsync(): Promise<string | null> {
    for (const validator of this.asyncValidators) {
      const error = await validator(this.value);
      if (error) {
        this._isValid = false;
        return error;
      }
    }
    this._isValid = true;
    return null;
  }

  /**
   * Validates the control.
   * @returns A validation error message or null.
   */
  validate(): string | null {
    for (const validator of this.validators) {
      const error = validator(this.value);
      if (error) {
        this._isValid = false;
        return error;
      }
    }
    this._isValid = true;
    return null;
  }

  /**
   * Resets the control to its initial state.
   */
  reset(): void {
    this.value = this.initialValue; // Reset to the initial value
    this.isTouched = false;
    this.isDirty = false;
    this.isFocused = false;
    this.isDisabled = false;
    this.validate(); // Trigger re-validation on reset
  }

  /**
   * Determines if the control is valid.
   * @returns True if the control is valid, otherwise false.
   */
  get isValid(): boolean {
    return this._isValid && !this.isDisabled;
  }

  /**
   * Retrieves the first validation error message for the control.
   * @returns A validation error message or null.
   */
  getErrorMessage(): string | null {
    for (const validator of this.validators) {
      const error = validator(this.value);
      if (error) {
        return error;
      }
    }
    return null;
  }

  subscribe(callback: (data: T) => void): () => void {
    // Register the callback with the EventEmitter's 'on' method
    const unsubscribe = this.valueChanges.on('valueChanges', callback);

    // Return an unsubscribe function
    return () => {
      // Unregister the callback using the 'off' method
      this.valueChanges.off('valueChanges', callback);
    };
  }

  bindToElement(element: FormElement | NodeListOf<FormElement>): void {
    this.element = element instanceof NodeList ? Array.from(element) : element;
    const elements = Array.isArray(this.element) ? this.element : [this.element];

    elements.forEach((elem) => {
      elem instanceof Element && this.setValue(this.initialValue);

      elem instanceof Element && elem.addEventListener('input', this.onInputChange.bind(this));
      elem instanceof Element && elem.addEventListener('focus', this.onInputFocus.bind(this));
      elem instanceof Element && elem.addEventListener('blur', this.onInputBlur.bind(this));
    });
  }

  onInputChange(event: Event): void {
    const target = event.target as FormElement;

    if (target instanceof HTMLInputElement && target.type === 'checkbox') {
      this.value = target.checked as any;
    } else if (target instanceof HTMLSelectElement) {
      this.value = Array.from(target.selectedOptions).map((opt) => opt.value) as any;
    } else if (target instanceof HTMLInputElement && target.type === 'radio') {
      if (target.checked) {
        this.value = target.value as any;
      }
    } else {
      this.value = target.value as any;
    }

    this.isDirty = true;
    this.isPristine = false;
    this.updateElementStatus();
  }

  onInputFocus(): void {
    this.isFocused = true;
    this.updateElementStatus();
  }

  onInputBlur(): void {
    this.isFocused = false;
    this.isTouched = true;
    this.updateElementStatus();
  }

  updateElementStatus(): void {
    if (!this.element) return;

    let elementsToUpdate = Array.isArray(this.element) ? this.element : [this.element];

    elementsToUpdate.forEach((element) => {
      if (this.isTouched) element.classList.add('touched');
      else element.classList.remove('touched');

      if (this.isDirty) element.classList.add('dirty');
      else element.classList.remove('dirty');

      if (this.isFocused) element.classList.add('focused');
      else element.classList.remove('focused');

      if (this.isPristine) element.classList.add('pristine');
      else element.classList.remove('pristine');

      if (this.isDisabled) element.setAttribute('disabled', 'true');
      else element.removeAttribute('disabled');
    });
  }
}
