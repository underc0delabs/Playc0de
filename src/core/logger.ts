import fs from 'fs';
import { createLogger, format, transports } from 'winston';

if (fs.existsSync('./reports/logs/combined.log')) {
    fs.writeFileSync('./reports/logs/combined.log', '');
}

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.File({ filename: './reports/logs/error.log', level: 'error' }),
        new transports.File({ filename: './reports/logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

export default logger;

// logger.info('Hello world!');  // logs the message to the console and to the log file
// logger.warn('Warning message');  // logs the message to the console and to the log file
// logger.error('Error message');  // logs the message to the console and to the log file
