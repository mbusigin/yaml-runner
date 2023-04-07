import * as fs from 'fs';
import * as child_process from 'child_process';
import * as yaml from 'js-yaml';

export const executeCommands = async (commands: string[]) => {
  const shell = child_process.spawn('sh', { stdio: 'inherit' });

  for (const command of commands) {
    if (shell.stdin) {
      shell.stdin.write(`${command}\n`);
      await new Promise((resolve) => {
        if (shell.stdout) {
          shell.stdout.once('data', resolve);
        }
      });
    }
  }

  if (shell.stdin) {
    shell.stdin.end();
  }
};

export const processYamlObjects = (yamlObjects: any[]) => {
  yamlObjects.forEach(async (obj) => {
    switch (obj.type) {
      case 'commands':
        await executeCommands(obj.commands);
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
