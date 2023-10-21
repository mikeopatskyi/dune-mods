"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
class Validators {
    static required(errorMessage) {
        return (value) => {
            return value !== null && value !== undefined && value !== '' ? null : errorMessage;
        };
    }
    static minLength(length, errorMessage) {
        return (value) => {
            return value.length >= length ? null : errorMessage;
        };
    }
    static maxLength(length, errorMessage) {
        return (value) => {
            return value.length <= length ? null : errorMessage;
        };
    }
    static pattern(regex, errorMessage) {
        return (value) => {
            return regex.test(value) ? null : errorMessage;
        };
    }
    static onlyAlphabets(errorMessage) {
        return (value) => {
            return /^[A-Za-z]+$/.test(value) ? null : errorMessage;
        };
    }
    static email(errorMessage) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return this.pattern(emailRegex, errorMessage);
    }
}
exports.Validators = Validators;
//# sourceMappingURL=validators.js.map