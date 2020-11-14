"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Path = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
//import { UserId } from "./userId"; Create path id instead??
const Guard_1 = require("../core/logic/Guard");
class Path extends AggregateRoot_1.AggregateRoot {
    /*get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UserId {
        return UserId.caller(this.id)
    }*/
    get name() {
        return this.props.name;
    }
    get segmentList() {
        return this.props.segmentList;
    }
    get firstNode() {
        return this.props.firstNode;
    }
    get lastNode() {
        return this.props.lastNode;
    }
    constructor(props) {
        super(props);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
            { argument: props.segmentList, argumentName: 'segmentList' },
            { argument: props.firstNode, argumentName: 'firstNode' },
            { argument: props.lastNode, argumentName: 'lastNode' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const path = new Path(Object.assign({}, props));
            return Result_1.Result.ok(path);
        }
    }
}
exports.Path = Path;
//# sourceMappingURL=path.js.map