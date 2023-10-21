export declare class Validators {
    static required(errorMessage: string): (value: any) => string | null;
    static minLength(length: number, errorMessage: string): (value: string) => string | null;
    static maxLength(length: number, errorMessage: string): (value: string) => string | null;
    static pattern(regex: RegExp, errorMessage: string): (value: string) => string | null;
    static onlyAlphabets(errorMessage: string): (value: string) => string | null;
    static email(errorMessage: string): (value: string) => string | null;
}
