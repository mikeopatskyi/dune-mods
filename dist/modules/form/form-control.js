"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormControl = void 0;
const event_emitter_1 = require("./event-emitter");
class FormControl {
    element;
    initialValue;
    _isValid = false;
    value;
    validators = [];
    asyncValidators = [];
    isTouched = false;
    isDirty = false;
    isFocused = false;
    isPristine = true;
    isDisabled = false;
    valueChanges = new event_emitter_1.EventEmitter();
    constructor(initialValue) {
        this.value = initialValue;
        this.initialValue = initialValue;
    }
    /**
     * Sets the value of the control and triggers validation.
     * @param value - The value to set.
     */
    setValue(value) {
        this.value = value;
        this.isDirty = true;
        this.isPristine = false;
        // Update the associated HTML input element if it exists
        if (this.element) {
            const elementsToUpdate = Array.isArray(this.element) ? this.element : [this.element];
            elementsToUpdate.forEach((elem) => {
                if (elem instanceof HTMLInputElement ||
                    elem instanceof HTMLTextAreaElement ||
                    elem instanceof HTMLSelectElement) {
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
    setValidators(validators) {
        this.validators = validators;
        this._isValid = false;
        this.validate();
    }
    /**
     * Adds a regular expression validator to the control.
     * @param regex - The regular expression to test against.
     * @param errorMessage - The error message to return if validation fails.
     */
    addRegexValidator(regex, errorMessage) {
        this.validators.push((value) => (regex.test(String(value)) ? null : errorMessage));
        this._isValid = false;
        this.validate();
    }
    /**
     * Assigns the specified asynchronous validators to the control.
     * @param asyncValidators - The asynchronous validators to set.
     */
    setAsyncValidators(asyncValidators) {
        this.asyncValidators = asyncValidators;
        this._isValid = false;
        this.validateAsync();
    }
    /**
     * Marks the control as touched.
     */
    markAsTouched() {
        this.isTouched = true;
    }
    /**
     * Marks the control as focused.
     */
    markAsFocused() {
        this.isFocused = true;
    }
    /**
     * Marks the control as untouched.
     */
    markAsUntouched() {
        this.isTouched = false;
    }
    /**
     * Marks the control as unfocused.
     */
    markAsUnfocused() {
        this.isFocused = false;
    }
    /**
     * Disables the control.
     */
    markAsDisabled() {
        this.isDisabled = true;
    }
    /**
     * Enables the control.
     */
    markAsEnabled() {
        this.isDisabled = false;
    }
    /**
     * Marks the control as having been interacted with by the user, typically by altering its value.
     */
    markAsDirty() {
        this.isDirty = true;
        this.isPristine = false; // If it's dirty, it's no longer pristine
    }
    /**
     * Validates the control using asynchronous validators.
     * @returns A promise resolving to a validation error message or null.
     */
    async validateAsync() {
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
    validate() {
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
    reset() {
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
    get isValid() {
        return this._isValid && !this.isDisabled;
    }
    /**
     * Retrieves the first validation error message for the control.
     * @returns A validation error message or null.
     */
    getErrorMessage() {
        for (const validator of this.validators) {
            const error = validator(this.value);
            if (error) {
                return error;
            }
        }
        return null;
    }
    subscribe(callback) {
        // Register the callback with the EventEmitter's 'on' method
        const unsubscribe = this.valueChanges.on('valueChanges', callback);
        // Return an unsubscribe function
        return () => {
            // Unregister the callback using the 'off' method
            this.valueChanges.off('valueChanges', callback);
        };
    }
    bindToElement(element) {
        this.element = element instanceof NodeList ? Array.from(element) : element;
        const elements = Array.isArray(this.element) ? this.element : [this.element];
        elements.forEach((elem) => {
            elem instanceof Element && this.setValue(this.initialValue);
            elem instanceof Element && elem.addEventListener('input', this.onInputChange.bind(this));
            elem instanceof Element && elem.addEventListener('focus', this.onInputFocus.bind(this));
            elem instanceof Element && elem.addEventListener('blur', this.onInputBlur.bind(this));
        });
    }
    onInputChange(event) {
        const target = event.target;
        if (target instanceof HTMLInputElement && target.type === 'checkbox') {
            this.value = target.checked;
        }
        else if (target instanceof HTMLSelectElement) {
            this.value = Array.from(target.selectedOptions).map((opt) => opt.value);
        }
        else if (target instanceof HTMLInputElement && target.type === 'radio') {
            if (target.checked) {
                this.value = target.value;
            }
        }
        else {
            this.value = target.value;
        }
        this.isDirty = true;
        this.isPristine = false;
        this.updateElementStatus();
    }
    onInputFocus() {
        this.isFocused = true;
        this.updateElementStatus();
    }
    onInputBlur() {
        this.isFocused = false;
        this.isTouched = true;
        this.updateElementStatus();
    }
    updateElementStatus() {
        if (!this.element)
            return;
        let elementsToUpdate = Array.isArray(this.element) ? this.element : [this.element];
        elementsToUpdate.forEach((element) => {
            if (this.isTouched)
                element.classList.add('touched');
            else
                element.classList.remove('touched');
            if (this.isDirty)
                element.classList.add('dirty');
            else
                element.classList.remove('dirty');
            if (this.isFocused)
                element.classList.add('focused');
            else
                element.classList.remove('focused');
            if (this.isPristine)
                element.classList.add('pristine');
            else
                element.classList.remove('pristine');
            if (this.isDisabled)
                element.setAttribute('disabled', 'true');
            else
                element.removeAttribute('disabled');
        });
    }
}
exports.FormControl = FormControl;
//# sourceMappingURL=form-control.js.map