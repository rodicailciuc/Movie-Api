import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const PATH = dirname(__filename);

// Middleware function to create logs
const createLog = (req, res, next) => {
    const { method, url } = req;
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth();
    let day = now.getDay();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const message = `${chalk.red(
        `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    )} ------- ${chalk.green(method)} ------- ${chalk.yellow(url)}`;
    console.log(message);

    const log = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ----- ${method} ----- ${url}\n`;
    fs.appendFile(path.join(PATH, '..', 'logs', 'logs.txt'), log, (err) => {
        if (err) {
            console.error(err);
        }
    });

    next();
};

export default createLog;
