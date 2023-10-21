import { FormControl } from './form-control';
import { EventEmitter } from './event-emitter';
export declare class FormGroup {
    private formElement;
    controls: {
        [key: string]: FormControl<any>;
    };
    validationGroups: {
        [key: string]: string[];
    };
    events: EventEmitter<string>;
    constructor(formElement: string | HTMLFormElement, controls: {
        [key: string]: FormControl<any>;
    });
    /**
     * Adds a control to the FormGroup.
     * @param key - The name of the control.
     * @param control - The control instance.
     */
    addControl(key: string, control: FormControl<any>): void;
    /**
     * Removes a control from the form group.
     * @param key Name of the control to be removed.
     */
    removeControl(key: string): void;
    /**
     * Retrieves a control from the form group.
     * @param key Name of the control to be retrieved.
     * @returns Instance of the FormControl, or undefined if not found.
     */
    getControl(key: string): FormControl<any> | undefined;
    /**
     * Validates the controls in the FormGroup.
     * If a key is provided, it will validate only that control, otherwise it will validate all controls.
     * @param key - The name of the control to validate (optional).
     * @returns An object containing any validation errors.
     */
    validate(key?: string): Promise<{
        [key: string]: string;
    }>;
    /**
     * @returns All the values of the form controls.
     */
    get values(): {
        [key: string]: any;
    };
    /**
     * Resets all the controls in the form group to their initial state.
     */
    reset(): void;
    initDomEvents(formElement: string | HTMLFormElement): void;
    bindToFormElement(formElement: HTMLFormElement): void;
}
