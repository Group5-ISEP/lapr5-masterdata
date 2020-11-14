"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Guard_1 = require("../core/logic/Guard");
const Result_1 = require("../core/logic/Result");
class Node extends AggregateRoot_1.AggregateRoot {
    constructor(props, id) {
        super(props, id);
    }
    get id() {
        return this._id;
    }
    get name() {
        return this.props.name;
    }
    get depot() {
        return this.props.depot;
    }
    get reliefPoint() {
        return this.props.reliefPoint;
    }
    get latitude() {
        return this.props.latitude;
    }
    get longitude() {
        return this.props.longitude;
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.id, argumentName: 'id' },
            { argument: props.name, argumentName: 'name' },
            { argument: props.depot, argumentName: 'depot' },
            { argument: props.reliefPoint, argumentName: 'reliefPoint' },
            { argument: props.longitude, argumentName: 'longitude' },
            { argument: props.latitude, argumentName: 'latitude' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const node = new Node(Object.assign({}, props));
            return Result_1.Result.ok(node);
        }
    }
}
exports.Node = Node;
//# sourceMappingURL=node.js.map