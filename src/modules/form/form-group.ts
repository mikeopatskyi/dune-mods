import { FormControl } from '@form/form-control';
import { EventEmitter } from '@form/event-emitter';

export class FormGroup {
  private formElement: HTMLFormElement | null = null;

  controls: { [key: string]: FormControl<any> } = {};
  validationGroups: { [key: string]: string[] } = {};

  public events: EventEmitter<string> = new EventEmitter();

  constructor(
    formElement: string | HTMLFormElement,
    controls: { [key: string]: FormControl<any> }
  ) {
    this.controls = controls;
    this.formElement = formElement instanceof HTMLFormElement ? formElement : null;
    this.initDomEvents(formElement);
  }

  /**
   * Adds a control to the FormGroup.
   * @param key - The name of the control.
   * @param control - The control instance.
   */
  addControl(key: string, control: FormControl<any>): void {
    this.controls[key] = control;
  }

  /**
   * Removes a control from the form group.
   * @param key Name of the control to be removed.
   */
  removeControl(key: string): void {
    if (!this.controls[key]) {
      throw new Error(`Control with key "${key}" does not exist.`);
    }
    delete this.controls[key];

    // Emit event for control removal
    this.events.emit('controlRemoved', key);
  }

  /**
   * Retrieves a control from the form group.
   * @param key Name of the control to be retrieved.
   * @returns Instance of the FormControl, or undefined if not found.
   */
  getControl(key: string): FormControl<any> | undefined {
    return this.controls[key];
  }

  /**
   * Validates the controls in the FormGroup.
   * If a key is provided, it will validate only that control, otherwise it will validate all controls.
   * @param key - The name of the control to validate (optional).
   * @returns An object containing any validation errors.
   */
  async validate(key?: string): Promise<{ [key: string]: string }> {
    const errors: { [key: string]: string } = {};

    if (key) {
      const control = this.controls[key];
      control.markAsTouched();
      const error = await control.validate(); // Assuming validate can be async
      if (error) {
        errors[key] = error;
      }
    } else {
      for (const key in this.controls) {
        const control = this.controls[key];
        control.markAsTouched();
        const error = await control.validate(); // Assuming validate can be async
        if (error) {
          errors[key] = error;
        }
      }
    }

    return errors;
  }

  /**
   * @returns All the values of the form controls.
   */
  get values(): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    for (const key in this.controls) {
      result[key] = this.controls[key].value;
    }
    return result;
  }

  /**
   * Resets all the controls in the form group to their initial state.
   */
  reset(): void {
    for (const key in this.controls) {
      this.controls[key].reset();
    }
    this.events.emit('reset');
  }

  initDomEvents(formElement: string | HTMLFormElement) {
    const formEl = (
      !(formElement instanceof HTMLFormElement) ? document.querySelector(formElement) : formElement
    ) as HTMLFormElement;
    this.bindToFormElement(formEl);
  }

  bindToFormElement(formElement: HTMLFormElement): void {
    for (const controlName in this.controls) {
      const domElement = formElement.querySelector(`[name=${controlName}]`) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
      if (domElement) {
        this.controls[controlName].bindToElement(domElement);
      }
    }
  }
}
