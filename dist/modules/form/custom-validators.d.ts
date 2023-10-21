export declare class CustomValidators {
    private static validators;
    static add(name: string, validator: (value: any) => string | null): void;
    static remove(name: string): void;
    static get(name: string): (value: any) => string | null;
}
