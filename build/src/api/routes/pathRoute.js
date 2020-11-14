"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
var path_controller = require('../../controllers/pathController');
const route = express_1.Router();
exports.default = (app) => {
    app.use('/path', route);
    route.post('', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required()
        })
    }), (req, res, next) => path_controller.createPath(req, res, next));
    //To get the lines paths of a line, use lineRoute (that calls pathController)
};
//# sourceMappingURL=pathRoute.js.map