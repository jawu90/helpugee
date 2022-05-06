/**
 * Winston logger for express.
 * @file utils/logger.util.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires winston
 * @requires expressWinston
 */

// import npm-packages
import winston from 'winston';
import expressWinston from'express-winston';

// create express winston logger instance
const expressWinstonLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; },
});

// Export express winston logger instance
export default expressWinstonLogger;