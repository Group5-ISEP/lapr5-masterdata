
interface SegmentProps {
    startNode: string;
    endNode: string;
    duration: number;
    distance: number;
    order: number;
}
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

    public constructor(props: SegmentProps) {
        this.startNode = props.startNode;
        this.endNode = props.endNode;
        this.duration = props.duration;
        this.distance = props.distance;
        this.order = props.order;
    }
}
