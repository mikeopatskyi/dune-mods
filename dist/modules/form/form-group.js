"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormGroup = void 0;
const event_emitter_1 = require("./event-emitter");
class FormGroup {
    formElement = null;
    controls = {};
    validationGroups = {};
    events = new event_emitter_1.EventEmitter();
    constructor(formElement, controls) {
        this.controls = controls;
        this.formElement = formElement instanceof HTMLFormElement ? formElement : null;
        this.initDomEvents(formElement);
    }
    /**
     * Adds a control to the FormGroup.
     * @param key - The name of the control.
     * @param control - The control instance.
     */
    addControl(key, control) {
        this.controls[key] = control;
    }
    /**
     * Removes a control from the form group.
     * @param key Name of the control to be removed.
     */
    removeControl(key) {
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
    getControl(key) {
        return this.controls[key];
    }
    /**
     * Validates the controls in the FormGroup.
     * If a key is provided, it will validate only that control, otherwise it will validate all controls.
     * @param key - The name of the control to validate (optional).
     * @returns An object containing any validation errors.
     */
    async validate(key) {
        const errors = {};
        if (key) {
            const control = this.controls[key];
            control.markAsTouched();
            const error = await control.validate(); // Assuming validate can be async
            if (error) {
                errors[key] = error;
            }
        }
        else {
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
    get values() {
        const result = {};
        for (const key in this.controls) {
            result[key] = this.controls[key].value;
        }
        return result;
    }
    /**
     * Resets all the controls in the form group to their initial state.
     */
    reset() {
        for (const key in this.controls) {
            this.controls[key].reset();
        }
        this.events.emit('reset');
    }
    initDomEvents(formElement) {
        const formEl = (!(formElement instanceof HTMLFormElement) ? document.querySelector(formElement) : formElement);
        this.bindToFormElement(formEl);
    }
    bindToFormElement(formElement) {
        for (const controlName in this.controls) {
            const domElement = formElement.querySelector(`[name=${controlName}]`);
            if (domElement) {
                this.controls[controlName].bindToElement(domElement);
            }
        }
    }
}
exports.FormGroup = FormGroup;
//# sourceMappingURL=form-group.js.map