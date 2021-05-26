import core      from '@actions/core';
import { exec }  from '@actions/exec';

const scan = async () => {

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
    const inputOption = core.getInput('option');
   
    if (inputOption === 'start'){
        await exec('./.github/actions/sonar-dotnet-action/start-sonarqube.ps1', options);
    } 
    
    if (inputOption === 'stop'){
        await exec('./.github/actions/sonar-dotnet-action/stop-sonarqube.ps1', options);
        // check options throw error
    }

}

try {
 
  scan();
 
    // Get the JSON webhook payload for the event that triggered the workflow
    //    const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}