export class CustomValidators {
  private static validators: { [key: string]: (value: any) => string | null } = {};

  static add(name: string, validator: (value: any) => string | null): void {
    this.validators[name] = validator;
  }

  static remove(name: string): void {
    delete this.validators[name];
  }

  static get(name: string): (value: any) => string | null {
    return this.validators[name];
  }
}

// CustomValidators.add('noWhitespace', (value: string) => {
//   return /\s/.test(value) ? 'Whitespace is not allowed.' : null;
// });
