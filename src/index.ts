#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const inquirer = require('inquirer');
const chalk = require('chalk');
const boxen = require('boxen');

const argv =
 yargs(hideBin(process.argv))
  .command(
    'b',
    'Execute the beautiful CLI',
    (yargs) => {
      yargs
        .option('context', {
          alias: 'c',
          type: 'array',
          description: 'Specify context files',
        })
        .option('e', {
          type: 'string',
          description: 'Execute a command',
        });
    },
    (argv) => {
      const boxenOptions = {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
        backgroundColor: '#555555',
      };

      const welcomeMessage = boxen(
        chalk.green.bold('Welcome to the Beautiful CLI!'),
        boxenOptions
      );

      console.log(welcomeMessage);

      inquirer
        .prompt([
          {
            type: 'input',
            name: 'contextFiles',
            message: `Enter context files (${chalk.yellow(
              argv.context.join(', ')
            )}):`,
          },
          {
            type: 'input',
            name: 'executeCommand',
            message: `Enter command to execute (${chalk.yellow(argv.e)}):`,
          },
        ])
        .then((answers) => {
          console.log(
            `${chalk.green.bold(
              'Executing with context files:'
            )} ${answers.contextFiles}`
          );
          console.log(
            `${chalk.green.bold('Executing command:')} ${answers.executeCommand}`
          );
        });
    }
  )
  .help().argv;// Sets up the command-line interface for the Beautiful CLI.\n
