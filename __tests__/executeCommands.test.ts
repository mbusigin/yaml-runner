import { executeCommands } from '../src/runner';
import * as fs from 'fs';

test('should execute commands', () => {
  const commands = [
    'mkdir test-directory',
    'touch test-directory/test-file.txt',
  ];
  executeCommands(commands);

  expect(fs.existsSync('test-directory')).toBeTruthy();
  expect(fs.existsSync('test-directory/test-file.txt')).toBeTruthy();

  // Clean up
  fs.rmSync('test-directory/test-file.txt');
  fs.rmdirSync('test-directory');
});
