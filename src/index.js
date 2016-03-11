import { isNumber, isString } from 'magic-types';

const logLevels = ['all', 'warnings', 'errors'];

export class Log {
  constructor =
    ({ logLevel }) =>
      this.setLogLevel({ logLevel });

  setLogLevel =
    ({ logLevel }) => {
      if (isNumber(logLevel)) {
        if (logLevels.length < logLevel) {
          this.setLogLevelError({ logLevel });
          return;
        }

        this.logLevel = logLevels[logLevel];
      } else if (isString(logLevel)) {
        const logLevelIndex = logLevels.indexOf(logLevel);
        if (logLevelIndex === -1) {
          this.setLogLevelError({ logLevel });
          return;
        }

        this.logLevel = logLevelIndex;
      }
    };

  setLogLevelError =
    ({ logLevel }) =>
      this.error('logLevel', logLevel, 'does not exist');

  log =
    (...args) =>
      this.logLevel === 0 &&
      console.log(...args);

  warn =
    (...args) =>
      this.logLevel < 2 &&
      console.warn(...args);

  error =
    (...args) =>
      console.error(...args);

  success =
    (...args) =>
    this.logLevel === 0 &&
    console.log(`%c ${{ ...args }}`, 'color: green');

  info =
    (...args) =>
      this.log(...args);
}

export default new Log();
