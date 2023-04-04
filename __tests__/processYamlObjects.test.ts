import { processYamlObjects } from '../src/runner';
import * as fs from 'fs';

test('should process YAML objects and perform actions', () => {
  const yamlObjects = [
    {
      type: 'file',
      filename: 'test-file.txt',
      contents: 'Hello, World!',
    },
    {
      type: 'commands',
      commands: ['mkdir test-directory'],
    },
  ];
  processYamlObjects(yamlObjects);

  expect(fs.readFileSync('test-file.txt', 'utf-8')).toBe('Hello, World!');
  expect(fs.existsSync('test-directory')).toBeTruthy();

  // Clean up
  fs.unlinkSync('test-file.txt');
  fs.rmdirSync('test-directory');
});
