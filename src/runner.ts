import * as fs from 'fs';
import * as child_process from 'child_process';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as os from 'os';
import * as diff from 'diff';

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

async function applyPatch(targetFile: string, operation: string, content: string) {
  try {
    const fileContent = fs.readFileSync(targetFile, 'utf-8');
    const patches = diff.parsePatch(content) as diff.ParsedDiff[];

    if (operation === 'add') {
      const patchedContent = patches.reduce((content, patch) => diff.applyPatch(content, patch), fileContent);
      fs.writeFileSync(targetFile, patchedContent);
    } else if (operation === 'delete') {
      const reversedPatches = patches.map(patch => {
        const { hunks } = patch;
        const reversedHunks = hunks.map(hunk => {
          const { oldStart, oldLines, newStart, newLines, lines } = hunk;
          return {
            oldStart: newStart,
            oldLines: newLines,
            newStart: oldStart,
            newLines: oldLines,
            lines: lines.map(line => {
              if (line.startsWith('-')) return '+' + line.slice(1);
              if (line.startsWith('+')) return '-' + line.slice(1);
              return line;
            }),
          };
        });
        return { ...patch, hunks: reversedHunks };
      });

      const patchedContent = reversedPatches.reduce((content, patch) => diff.applyPatch(content, patch), fileContent);
      fs.writeFileSync(targetFile, patchedContent);
    } else {
      console.error(`Invalid patch operation: ${operation}`);
    }
  } catch (error: unknown) {
    console.error(`Error applying patch: ${(error as Error).message}`);
  }
}

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
      case 'patch':
        applyPatch(obj.targetFile, obj.operation, obj.content);
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

processYamlObjects(<any> yamlObjects);
