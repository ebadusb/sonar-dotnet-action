import { expect } from "chai";
import { exec } from "@actions/exec";

describe('return codes', function() {
    it('returns an error', async() => {
      const result = await runExec('./tests/return-error.ps1');
      expect(result).equal(false);   
    }); 

    it('runs successfully, returns true', async() => {
      const result = await runExec('./tests/return-success.ps1');
      expect(result).equal(true);   
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
    const result = await exec(script, args, options);
    console.log(`Result: ${result}`);
    return true;
  } catch(error){
    console.log("Caught error");
    return false;
  }
  
} 