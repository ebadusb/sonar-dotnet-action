"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const exec_1 = require("@actions/exec");
const scan = () => __awaiter(void 0, void 0, void 0, function* () {
    let output = '';
    let error = '';
    const options = {};
    options.listeners = {
        stdout: (data) => {
            output += data.toString();
        },
        stderr: (data) => {
            error += data.toString();
        }
    };
    const inputOption = core_1.getInput('option');
    if (inputOption === 'start') {
        yield exec_1.exec('./.github/actions/sonar-dotnet-action/start-sonarqube.ps1', options);
    }
    if (inputOption === 'stop') {
        yield exec_1.exec('./.github/actions/sonar-dotnet-action/stop-sonarqube.ps1', options);
        // check options throw error
    }
});
try {
    scan();
    // Get the JSON webhook payload for the event that triggered the workflow
    //    const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
}
catch (error) {
    core_1.setFailed(error.message);
}
//# sourceMappingURL=scan.js.map