Here's a suggested `README.md` file for the project:

```
# TypeScript Runner

A CLI tool for executing tasks defined in YAML files. It supports running commands, outputting instructions, and creating/appending files.

## Getting Started

To get started with the TypeScript Runner, follow the steps below:

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 14.x
- [TypeScript](https://www.typescriptlang.org/download) >= 4.x

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ts-runner.git
```

2. Install dependencies:

```bash
cd ts-runner
npm install
```

3. Compile the TypeScript files:

```bash
npm run build
```

4. Link the CLI tool:

```bash
npm link
```

## Usage

To use the TypeScript Runner, run the following command:

```bash
ts-runner path/to/your/commands.yaml
```

Replace `path/to/your/commands.yaml` with the path to your desired YAML file containing the tasks you want to execute.

## Example

Here's an example of a YAML file with a set of tasks:

```yaml
- type: instruction
  message: Create a new directory for the project and navigate to it
- type: commands
  commands:
    - mkdir ts-runner
    - cd ts-runner
```

In this example, the YAML file contains an instruction message and a set of commands to create a new directory and navigate to it.

## Contributing

If you'd like to contribute to this project, please submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```

This `README.md` file provides an introduction to the project, installation instructions, usage information, and an example of a YAML file with tasks. You can customize the repository URL and any other information as needed.