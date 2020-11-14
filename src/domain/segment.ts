
export class Segment {
    startNode: string;
    endNode: string;
    duration: number;
    distance: number;
    order: number;

    public getStartNode(): string {
        return this.startNode;
    }

    public getEndNode(): string {
        return this.endNode;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getDistance(): number {
        return this.distance;
    }

    public getOrder(): number {
        return this.order;
    }

    public constructor(sNode: string, eNode: string, dur: number, dis: number, order: number) {
        this.startNode = sNode;
        this.endNode = eNode;
        this.duration = dur;
        this.distance = dis;
        this.order = order;
    }
}
