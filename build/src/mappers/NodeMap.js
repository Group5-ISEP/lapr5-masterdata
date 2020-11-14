"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const node_1 = require("../domain/node");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class NodeMap extends Mapper_1.Mapper {
    static toDomain(node) {
        const roleOrError = node_1.Node.create(node, new UniqueEntityID_1.UniqueEntityID(node.domainId));
        roleOrError.isFailure ? console.log(roleOrError.error) : '';
        return roleOrError.isSuccess ? roleOrError.getValue() : null;
    }
    static toPersistence(role) {
        return {
            domainId: role.id.toString(),
            name: role.name
        };
    }
}
exports.NodeMap = NodeMap;
//# sourceMappingURL=NodeMap.js.map