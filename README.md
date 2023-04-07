# ts-runner

ts-runner is a command-line tool that automates the execution of tasks based on instructions defined in YAML files. It simplifies complex workflows and improves productivity by allowing users to create reusable, shareable scripts.

## Features

- Execute commands in sequence
- Create and modify files
- Display messages to the user
- Easy-to-use YAML configuration

## Prerequisites and Dependencies

Ensure you have Node.js and npm installed on your system.

This project uses the following npm packages:
- js-yaml
- yargs
- inquirer
- chalk
- boxen

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ts-runner.git
   ```
2. Install dependencies:
   ```
   cd ts-runner
   npm install
   ```

## Usage

To run ts-runner, execute the following command with the path to your YAML file:
```
node src/runner.js path/to/your/yaml/file.yaml
```

## Examples

See the `test` directory for example YAML files demonstrating various features of ts-runner.

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines on how to contribute to this project.
