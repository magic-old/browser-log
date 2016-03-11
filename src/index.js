import { isNumber, isString } from 'magic-types';

const logLevels = ['all', 'warnings', 'errors'];

export const log =
  (...args) =>
  log.logLevel === 0 &&
  console.log(...args);

log.setLogLevel =
  ({ logLevel }) => {
    if (isNumber(logLevel)) {
      if (logLevels.length < logLevel) {
        log.setLogLevelError({ logLevel });
        return;
      }

      log.logLevel = logLevels[logLevel];
    } else if (isString(logLevel)) {
      const logLevelIndex = logLevels.indexOf(logLevel);

      if (logLevelIndex === -1) {
        log.setLogLevelError({ logLevel });
        return;
      }

      log.logLevel = logLevelIndex;
    }
  };

log.setLogLevelError =
  ({ logLevel }) =>
    log.error('logLevel', logLevel, 'does not exist');

log.warn =
  (...args) =>
    log.logLevel < 2 &&
    console.warn(...args);

log.error =
  (...args) =>
    console.error(...args);

log.success =
  (...args) =>
    log.logLevel === 0 &&
    console.log(`%c ${{ ...args }}`, 'color: green');

log.info =
  (...args) =>
    log.log(...args);

export default log;
