import { expect } from "chai";

import * as core from '@actions/core';
import * as exec from "@actions/exec";
import { scan} from "../src/scan";


describe('return codes', function() {

    it('returns an error', async() => {
      const result = await runExec('./tests/return-error.ps1');
      expect(result).equal(false);   
    }); 

    it('returns an error, checks options', async() => {
      const result = await runExec('./tests/return-error.ps1');
      expect(result).equal(false);   
    }); 

    it('runs successfully, returns true', async() => {
      const result = await runExec('./tests/return-success.ps1');
      expect(result).equal(true);   
    });    

    it('runs stop-sonarqube with no previous run. Expect false returned.', async() => {

      core.exportVariable('BCT_SONARQUBE_TOKEN', '123');
      core.exportVariable('BCT_EVENT_NAME', 'pull_request');
      const result = await runExec('./stop-sonarqube.ps1');
      expect(result).equal(false);   

    });    

    it('runs stop-sonarqube w/out the token and event vars set. Expect false returned.', async() => {

      const result = await runExec('./stop-sonarqube.ps1');
      expect(result).equal(false);   

    });   

    it('runs scan function as a GH action would.', async() => {

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
      
      try{

        scan("stop", options);
        console.log(`Scanned result:`);
      
      } catch(error){
        console.log(`Error: ${error}`);
        core.setFailed(error.message);
      }
           

    });     
    

});

const runExec = async(script: string): Promise<boolean> => {
  let output = '';
  let error = '';
  
  const options:  any = {};
  options.listeners = {
    stdout: (data: Buffer) => {
      output += data.toString();
    },
    stderr: (data: Buffer) => {
      error += data.toString();
    }
  };
 
  try{
    const args: any = [];
    const result = await exec.exec(script, args, options);
    console.log(`Result: ${result}`);
    return true;
  } catch(error){
    console.log(`Caught error: ${error}`);
    return false;
  }
  
} 