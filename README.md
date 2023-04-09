# ts-runner

ts-runner is a command-line tool that automates the execution of tasks based on instructions defined in YAML files. It's main purpose is to execute instructions from GPT-4, or other LLMs.

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
   git clone https://github.com/mbusigin/yaml-runner
   ```
2. Install dependencies:
   ```
   cd ts-runner
   npm install
   ```

## Usage

Have GPT-4 plan out some changes to your code base. Next, jam this into your system prompt:

   1. For each natural language instruction, identify the primary action and its related components. The primary action should be one of the following: executing commands, creating or modifying files, or displaying messages.

   2. Convert each primary action and its components into a corresponding YAML object using the YAML specification provided earlier.

   3. Here's a guideline for mapping natural language instructions to YAML objects:

      a. If the instruction is about executing commands:
         - Identify the list of commands to be executed.
         - Create a YAML object with `type: commands` and list the commands under the `commands` field.

      b. If the instruction is about creating or modifying a file:
         - Identify the file name, file contents, and whether it's a new file or an existing file.
         - Create a YAML object with `type: file`, and include the `filename`, `contents`, and `append` fields as needed.

      c. If the instruction is about displaying a message to the user:
         - Identify the message to be displayed.
         - Create a YAML object with `type: instruction` and include the `message` field with the identified message.

   4. Arrange the YAML objects in the order of the natural language instructions.

   5. Output the final YAML content, combining all the created YAML objects.

   For example, if the natural language instructions are:
   - Create a new directory called "project".
   - Navigate to the "project" directory.
   - Display a message saying "Directory created and navigated."

   You would generate the following YAML content:

   ```yaml
   - type: commands
     commands:
       - mkdir project
       - cd project
   - type: instruction
     message: Directory created and navigated.
   ```

   If you need to update a file, you need to *COMPLETELY* replace its contents with type: file -> contents. Every file must include all of its contents.

Then execute the output instructions:

To run ts-runner, execute the following command with the path to your YAML file:
```
node src/runner.js path/to/your/yaml/file.yaml
```

## Examples

See the `test` directory for example YAML files demonstrating various features of ts-runner.

## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for guidelines on how to contribute to this project.
