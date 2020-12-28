const { success, error } = require('consola');

import chalk from 'chalk';

export function successClg(message: String): void {
  // success({ message, badges: true });
  console.log(chalk.black.bgGreenBright('SUCCESS') + ' ' + message);
}

export function errorClg(message: String): void {
  // error({ message, badges: true });
  console.log(chalk.black.bgRedBright('ERROR') + ' ' + message);
}
