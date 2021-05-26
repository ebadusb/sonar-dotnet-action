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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const scan = () => __awaiter(void 0, void 0, void 0, function* () {
    let output = '';
    let error = '';
    const options = {};
    // options.listeners = {
    // stdout: (data: Buffer) => {
    //   output += data.toString();
    // },
    // stderr: (data: Buffer) => {
    //   error += data.toString();
    // }
    // };
    const inputOption = core_1.default.getInput('option');
    // if (inputOption === 'start'){
    //     await exec.exec('./.github/actions/sonarqube/start-sonarqube.ps1', options);
    // } 
    // if (inputOption === 'stop'){
    //     await exec.exec('./.github/actions/sonarqube/stop-sonarqube.ps1', options);
    //     // check options throw error
    // }
});
try {
    scan();
    // Get the JSON webhook payload for the event that triggered the workflow
    //    const payload = JSON.stringify(github.context.payload, undefined, 2)
    //   console.log(`The event payload: ${payload}`);
}
catch (error) {
    core_1.default.setFailed(error.message);
}
//# sourceMappingURL=index.js.map