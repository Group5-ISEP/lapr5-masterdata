"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const segment_1 = require("../../domain/segment");
const mongoose_1 = __importDefault(require("mongoose"));
const PathSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please enter node name'],
        index: true,
    },
    segmentList: {
        type: [segment_1.Segment
            /*{
            startNode: String,
            endNode: String,
            duration: Number,
            distance: Number,
            order: Number,
            }*/
        ],
        required: [true, 'Please enter the segment list'],
    },
    firstNode: {
        type: String,
        required: true,
    },
    lastNode: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('PathSchema', PathSchema);
//# sourceMappingURL=pathSchema.js.map