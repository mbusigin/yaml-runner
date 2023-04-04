import * as fs from 'fs';
import * as child_process from 'child_process';
import * as yaml from 'js-yaml';

export const executeCommands = (commands: string[]) => {
  commands.forEach((command) => {
    child_process.execSync(command, { stdio: 'inherit' });
  });
};

export const processYamlObjects = (yamlObjects: any[]) => {
  yamlObjects.forEach((obj) => {
    switch (obj.type) {
      case 'commands':
        executeCommands(obj.commands);
        break;
      case 'instruction':
        console.log(obj.message);
        break;
      case 'file':
        if (obj.append) {
          fs.appendFileSync(obj.filename, obj.append);
        } else {
          fs.writeFileSync(obj.filename, obj.contents);
        }
        break;
      default:
        console.error(`Invalid YAML object type: ${obj.type}`);
        break;
    }
  });
};

const yamlFilePath = process.argv[2];

if (!yamlFilePath) {
  console.error('Please provide a YAML file path as an argument.');
  process.exit(1);
}

const yamlContent = fs.readFileSync(yamlFilePath, 'utf-8');
const yamlObjects = yaml.load(yamlContent);

processYamlObjects(<any> yamlObjects); // TODO: we should have better type safety here....
