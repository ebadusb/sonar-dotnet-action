import  * as core  from '@actions/core';
import * as exec   from '@actions/exec';
import * as io     from '@actions/io';

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
    // script = './.github/actions/sonar-dotnet-action/start-sonarqube.ps1';
    await io.cp('./.github/actions/sonar-dotnet-action/start-sonarqube.ps1', './ci/start-sonarqube.ps1');
    script = './ci/start-sonarqube.ps1';

  } 
    
  if (flag === 'stop'){
    // script = './.github/actions/sonar-dotnet-action/stop-sonarqube.ps1';
    await io.cp('./.github/actions/sonar-dotnet-action/stop-sonarqube.ps1', './ci/stop-sonarqube.ps1');
    script = './ci/stop-sonarqube.ps1';
  }

  const args: any = [];

  await exec.exec('pwd', args. execOpts);
 
  return await exec.exec(script, args, execOpts);

}


scan(inputSwitch, options).catch(e => {
  core.setFailed(e.message)
});
