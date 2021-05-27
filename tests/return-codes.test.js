"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const chai_1 = require("chai");
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
describe('return codes', function () {
    it('returns an error', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield runExec('./tests/return-error.ps1');
        chai_1.expect(result).equal(false);
    }));
    it('runs successfully, returns true', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield runExec('./tests/return-success.ps1');
        chai_1.expect(result).equal(true);
    }));
    it('runs stop-sonarqube with no previous run. Expect false returned.', () => __awaiter(this, void 0, void 0, function* () {
        core.exportVariable('BCT_SONARQUBE_TOKEN', '123');
        core.exportVariable('BCT_EVENT_NAME', 'pull_request');
        const result = yield runExec('../stop-sonarqube.ps1');
        chai_1.expect(result).equal(false);
    }));
    it('runs stop-sonarqube w/out the token and event vars set. Expect false returned.', () => __awaiter(this, void 0, void 0, function* () {
        const result = yield runExec('../stop-sonarqube.ps1');
        chai_1.expect(result).equal(false);
    }));
});
const runExec = (script) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const args = [];
        const result = yield exec.exec(script, args, options);
        console.log(`Result: ${result}`);
        return true;
    }
    catch (error) {
        console.log("Caught error");
        return false;
    }
});
//# sourceMappingURL=return-codes.test.js.map