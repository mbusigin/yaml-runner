import { processYamlObjects } from '../src/runner';

test('should output instruction message', () => {
  const yamlObjects = [
    {
      type: 'instruction',
      message: 'This is a test instruction',
    },
  ];

  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  processYamlObjects(yamlObjects);

  expect(consoleSpy).toHaveBeenCalledWith('This is a test instruction');

  consoleSpy.mockRestore();
});
