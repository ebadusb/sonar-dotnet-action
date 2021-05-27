import  * as core  from '@actions/core';
import * as exec   from '@actions/exec';

let output = '';
let error = '';
const options: any = {};
options.listeners = {
  stdout: (data: Buffer) => {
    output += data.toString();
  },
  stderr: (data: Buffer) => {
    error += data.toString();
  }
};

const inputSwitch = core.getInput('option');

export async function scan (flag: string, execOpts: any): Promise<number> {

  let script = "";
  if (flag === 'start'){
    script = './.github/actions/sonar-dotnet-action/start-sonarqube.ps1';
  } 
    
  if (flag === 'stop'){
    script = './.github/actions/sonar-dotnet-action/stop-sonarqube.ps1';
  }

  const args: any = [];
 
  return await exec.exec(script, args, execOpts);

}


scan(inputSwitch, options).catch(e => {
  core.setFailed(e.message)
});
