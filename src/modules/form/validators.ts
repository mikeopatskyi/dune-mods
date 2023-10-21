export class Validators {
  static required(errorMessage: string): (value: any) => string | null {
    return (value: any) => {
      return value !== null && value !== undefined && value !== '' ? null : errorMessage;
    };
  }

  static minLength(length: number, errorMessage: string): (value: string) => string | null {
    return (value: string) => {
      return value.length >= length ? null : errorMessage;
    };
  }

  static maxLength(length: number, errorMessage: string): (value: string) => string | null {
    return (value: string) => {
      return value.length <= length ? null : errorMessage;
    };
  }

  static pattern(regex: RegExp, errorMessage: string): (value: string) => string | null {
    return (value: string) => {
      return regex.test(value) ? null : errorMessage;
    };
  }

  static onlyAlphabets(errorMessage: string): (value: string) => string | null {
    return (value: string) => {
      return /^[A-Za-z]+$/.test(value) ? null : errorMessage;
    };
  }

  static email(errorMessage: string): (value: string) => string | null {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return this.pattern(emailRegex, errorMessage);
  }
}
