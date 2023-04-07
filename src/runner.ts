import * as fs from 'fs';
import * as child_process from 'child_process';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as os from 'os';

export const executeCommands =
 async (commands: string[]) => {
  const shellScriptPath = path.join(os.tmpdir(), 'temp_script.sh');
  fs.writeFileSync(shellScriptPath, commands.join('\n'));

  try {
    const result = child_process.execSync(`bash ${shellScriptPath}`, { stdio: 'inherit' });
  } catch (error: any) {
    console.error('Error executing commands:', error.message);
  } finally {
    fs.unlinkSync(shellScriptPath);
  }
};



export const processYamlObjects =
 (yamlObjects: any[]) => {
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
// This function executes an array of commands.\n
// This function processes YAML objects and performs the corresponding actions.\n
// The main function that reads the YAML file and processes the YAML objects.\n
