import { JTError } from '../../common';
import { HTTP_STATUS_OPTS, HTTP_STATUS } from '../../utils';

export class ProductError extends JTError {
  constructor(
    message: string,
    status: HTTP_STATUS_OPTS = HTTP_STATUS.BAD_REQUEST,
  ) {
    super('ProductError', message, status);
  }
}
