"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const NodeMap_1 = require("../mappers/NodeMap");
const mongoose_1 = require("mongoose");
let nodeRepo = class nodeRepo {
    constructor(nodeSchema) {
        this.nodeSchema = nodeSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    exists(t) {
        throw new Error("Method not implemented.");
    }
    async save(node) {
        const query = { domainId: node.id.toString() };
        const nodeDocument = await this.nodeSchema.findOne(query);
        try {
            if (nodeDocument === null) {
                const rawNode = NodeMap_1.NodeMap.toPersistence(node);
                const nodeCreated = await this.nodeSchema.create(rawNode);
                return NodeMap_1.NodeMap.toDomain(nodeCreated);
            }
            else {
                nodeDocument.name = node.name;
                await nodeDocument.save();
                return node;
            }
        }
        catch (err) {
            throw err;
        }
    }
    ListNodes(nodeId) {
        throw new Error("Method not implemented.");
    }
};
nodeRepo = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject('nodeSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], nodeRepo);
exports.default = nodeRepo;
//# sourceMappingURL=nodeRepo.js.map