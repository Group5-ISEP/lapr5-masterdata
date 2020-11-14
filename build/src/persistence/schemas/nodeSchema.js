"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NodeSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: [true, 'Please enter node name'],
        index: true,
    },
    depot: {
        type: Boolean,
        required: [true, 'Please enter if the node is a depot stop'],
    },
    reliefPoint: {
        type: Boolean,
        required: [true, 'Please enter if the node is a relief point'],
    },
    longitude: {
        type: Number,
        required: [true, 'Please enter the nodes longitude'],
    },
    latitude: {
        type: Number,
        required: [true, 'Please enter the nodes latitude'],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('NodeSchema', NodeSchema);
//# sourceMappingURL=nodeSchema.js.map