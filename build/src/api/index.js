"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import auth from './routes/authRoute';
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const roleRoute_1 = __importDefault(require("./routes/roleRoute"));
exports.default = () => {
    const app = express_1.Router();
    //auth(app);
    userRoute_1.default(app);
    roleRoute_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map