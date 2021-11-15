import { HTTP_STATUS, HTTP_STATUS_OPTS } from '../utils';

interface JError {
  message: string;
  status: HTTP_STATUS_OPTS;
  name: string;
}

export abstract class JTError extends Error {
  private _status: HTTP_STATUS_OPTS;

  constructor(name: string, message: string, status: HTTP_STATUS_OPTS) {
    super();
    this.name = name;
    this.message = message;
    this._status = status;
  }

  get status(): number {
    return this._status;
  }

  get messageError(): JError {
    return {
      name: this.name,
      status: this.status,
      message: this.message,
    };
  }

  static isJTError(err: Error | JTError): boolean {
    return err instanceof JTError;
  }

  static generateJTError(message: string): GenericJTError {
    return new GenericJTError(message);
  }
}

class GenericJTError extends JTError {
  constructor(message: string) {
    super('GenericJTError', message, HTTP_STATUS.BAD_REQUEST);
  }
}
