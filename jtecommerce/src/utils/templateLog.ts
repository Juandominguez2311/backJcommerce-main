import { Log } from '@muzzatech/log';

export const logAndConfigurePath = (
  log: Log,
  method: string,
  path: string,
): string => {
  log.info(`configure [${method}] -> ${path}`);
  return path;
};
