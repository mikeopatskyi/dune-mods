import { EventEmitter } from './event-emitter';
import { FormGroup } from './form-group';
type FormElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
export declare class FormControl<T extends string | boolean | number> {
    private element?;
    private initialValue;
    private _isValid;
    value: T;
    validators: ((value: T, formGroup?: FormGroup) => string | null)[];
    asyncValidators: ((value: T, formGroup?: FormGroup) => Promise<string | null>)[];
    isTouched: boolean;
    isDirty: boolean;
    isFocused: boolean;
    isPristine: boolean;
    isDisabled: boolean;
    valueChanges: EventEmitter<T>;
    constructor(initialValue: T);
    /**
     * Sets the value of the control and triggers validation.
     * @param value - The value to set.
     */
    setValue(value: T): void;
    /**
     * Assigns the specified validators to the control.
     * @param validators - The validators to set.
     */
    setValidators(validators: ((value: T, formGroup?: FormGroup) => string | null)[]): void;
    /**
     * Adds a regular expression validator to the control.
     * @param regex - The regular expression to test against.
     * @param errorMessage - The error message to return if validation fails.
     */
    addRegexValidator(regex: RegExp, errorMessage: string): void;
    /**
     * Assigns the specified asynchronous validators to the control.
     * @param asyncValidators - The asynchronous validators to set.
     */
    setAsyncValidators(asyncValidators: ((value: T, formGroup?: FormGroup) => Promise<string | null>)[]): void;
    /**
     * Marks the control as touched.
     */
    markAsTouched(): void;
    /**
     * Marks the control as focused.
     */
    markAsFocused(): void;
    /**
     * Marks the control as untouched.
     */
    markAsUntouched(): void;
    /**
     * Marks the control as unfocused.
     */
    markAsUnfocused(): void;
    /**
     * Disables the control.
     */
    markAsDisabled(): void;
    /**
     * Enables the control.
     */
    markAsEnabled(): void;
    /**
     * Marks the control as having been interacted with by the user, typically by altering its value.
     */
    markAsDirty(): void;
    /**
     * Validates the control using asynchronous validators.
     * @returns A promise resolving to a validation error message or null.
     */
    private validateAsync;
    /**
     * Validates the control.
     * @returns A validation error message or null.
     */
    validate(): string | null;
    /**
     * Resets the control to its initial state.
     */
    reset(): void;
    /**
     * Determines if the control is valid.
     * @returns True if the control is valid, otherwise false.
     */
    get isValid(): boolean;
    /**
     * Retrieves the first validation error message for the control.
     * @returns A validation error message or null.
     */
    getErrorMessage(): string | null;
    subscribe(callback: (data: T) => void): () => void;
    bindToElement(element: FormElement | NodeListOf<FormElement>): void;
    onInputChange(event: Event): void;
    onInputFocus(): void;
    onInputBlur(): void;
    updateElementStatus(): void;
}
export {};
