const winston = require('winston');

const {format,createLogger} = winston;

export const logger = createLogger({
  level: 'info',
  defaultMeta: { service: 'user-service' },
  format:format.combine(
      format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
        }),
      format.colorize(),format.simple(),
      winston.format.json(),
      ),
      
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'logs/errorBSAS.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combinedBSAS.log' }),
    new winston.transports.Console({format: format.combine(format.colorize(),format.simple())})
  ],
});