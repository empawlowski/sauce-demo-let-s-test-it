import winston from 'winston';

const options = winston.format.combine(
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`),
  winston.format.colorize({
    all: true,
  }),
);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    //
    // - Write all logs with importance level of `error` or higher to `error.log`
    //   (i.e., error, fatal, but not other levels)
    //
    new winston.transports.File({
      filename: 'src/output/logs/error.log',
      maxFiles: 5,
      maxsize: 5 * 1024,
      level: 'error',
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    //
    // - Write all logs with importance level of `info` or higher to `combined.log`
    //   (i.e., fatal, error, warn, and info, but not trace)
    //
    new winston.transports.File({
      filename: 'src/output/logs/combined.log',
      maxFiles: 5,
      maxsize: 5 * 1024,
      format: winston.format.combine(options),
    }),
  ],
});
