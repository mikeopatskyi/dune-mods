"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidators = void 0;
class CustomValidators {
    static validators = {};
    static add(name, validator) {
        this.validators[name] = validator;
    }
    static remove(name) {
        delete this.validators[name];
    }
    static get(name) {
        return this.validators[name];
    }
}
exports.CustomValidators = CustomValidators;
// CustomValidators.add('noWhitespace', (value: string) => {
//   return /\s/.test(value) ? 'Whitespace is not allowed.' : null;
// });
//# sourceMappingURL=custom-validators.js.map