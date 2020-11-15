"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
var node_controller = require('../../controllers/IControllers/INodeController');
const route = express_1.Router();
exports.default = (app) => {
    app.use('/node', route);
    route.post('', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => node_controller.createnode(req, res, next));
    //To get the lines nodes of a line, use lineRoute (that calls nodeController)
};
//# sourceMappingURL=nodeRoute.js.map