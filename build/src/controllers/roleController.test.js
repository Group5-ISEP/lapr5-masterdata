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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const roleController_1 = require("./roleController");
describe('role controller create', function () {
    beforeEach(function () {
        let roleServiceClass = require(config_1.default.services.role.path).default;
        let roleServiceInstance = typedi_1.Container.get(roleServiceClass);
        typedi_1.Container.set(config_1.default.services.role.name, roleServiceInstance);
        let roleService = typedi_1.Container.get(config_1.default.services.role.name);
        sinon.stub(roleService, 'createRole');
    });
    it('returns json with id+name values', async function () {
        let body = { "name": 'role1' };
        let req = {};
        let res = {
            json: sinon.stub()
        };
        let next = () => { };
        const ctrl = typedi_1.Container.get(roleController_1.RoleController);
        await ctrl.createRole(req, res, next);
        sinon.assert.called(res.json, { "id": "42db239f-d33b-4880-8caf-747c2cf41e81", "name": "role1" });
        let a = 12;
    });
});
//# sourceMappingURL=roleController.test.js.map