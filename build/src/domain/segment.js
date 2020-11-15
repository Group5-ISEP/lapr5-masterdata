"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Segment = void 0;
class Segment {
    constructor(sNode, eNode, dur, dis, order) {
        this.startNode = sNode;
        this.endNode = eNode;
        this.duration = dur;
        this.distance = dis;
        this.order = order;
    }
    getStartNode() {
        return this.startNode;
    }
    getEndNode() {
        return this.endNode;
    }
    getDuration() {
        return this.duration;
    }
    getDistance() {
        return this.distance;
    }
    getOrder() {
        return this.order;
    }
}
exports.Segment = Segment;
//# sourceMappingURL=segment.js.map