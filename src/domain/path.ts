import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Segment } from "./segment";
import IPathDTO from "../dto/IPathDTO";

interface PathProps {
    lineCode: string;
    direction: string;
    segmentList: Segment[];
    firstNode: string;
    lastNode: string;
    isEmpty: boolean
}

export class Path extends AggregateRoot<PathProps> {

    get lineCode(): string {
        return this.props.lineCode;
    }

    get direction(): string {
        return this.props.direction;
    }

    get segmentList(): Segment[] {
        return this.props.segmentList;
    }

    get firstNode(): string {
        return this.props.firstNode;
    }

    get lastNode(): string {
        return this.props.lastNode;
    }

    get isEmpty(): boolean {
        return this.props.isEmpty
    }

    private constructor(props: PathProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: IPathDTO, id?: UniqueEntityID): Result<Path> {

        const { lineCode, firstNode, lastNode, segmentList, direction } = props

        if (!lineCode || lineCode.trim().length <= 0) {
            return Result.fail<Path>("Line code must be specified")
        }
        if (!direction || direction.trim().length <= 0 || (direction.toLowerCase() != 'go' && direction.toLowerCase() != 'return')) {
            return Result.fail<Path>("Direction 'Go' or 'Return' must be specified")
        }
        if (!firstNode || firstNode.trim().length <= 0) {
            return Result.fail<Path>("First node must be specified")
        }
        if (!lastNode || lastNode.trim().length <= 0) {
            return Result.fail<Path>("Last node must be specified")
        }
        if (!segmentList || segmentList.length <= 0) {
            return Result.fail<Path>("At least one segment must be specified")
        }


        // validation of segment uses Path props, so must be done here
        try {
            segmentList.forEach(segmentProps => {
                const { startNode, endNode, distance, duration, order } = segmentProps
                if (!startNode || startNode.trim().length <= 0) {
                    throw "Segment start node must be specified"
                }
                if (!endNode || endNode.trim().length <= 0) {
                    throw "Segment end node must be specified"
                }
                if (!distance || distance < 0) {
                    throw "Segment distance must be a positive number"
                }
                if (!duration || duration < 0) {
                    throw "Segment duration must be a positive number"
                }
                if (!order || order <= 0 || order > segmentList.length) {
                    throw "Segment order should be between 1 and number of segments"
                }

                const orderFiltered = segmentList.filter(seg => seg.order === order)
                if (orderFiltered.length > 1) {
                    throw "There cant be segments with the same order value"
                }

                //first segment
                if (order === 1) {
                    if (startNode != firstNode) {
                        throw "First segment's startnode must be the same as the path first node"
                    }
                }
                //last segment
                if (order === segmentList.length) {
                    if (endNode != lastNode) {
                        throw "Last segment's end node must be the same as the path last node"
                    }
                }
                //only runs for middle and last segment
                //checks between segments if one's last node is the same as the next first node
                if (order > 1) {
                    const previousSegment = segmentList.find(x => x.order === (order - 1))
                    if (startNode != previousSegment.endNode) {
                        throw "Segments start node must be the same as previous segment end node"
                    }
                }
            })
        } catch (error) {
            return Result.fail<Path>(error)
        }


        let segments = props.segmentList.map(segmentProps => { return new Segment(segmentProps) })


        const path = new Path({
            lineCode: props.lineCode,
            firstNode: props.firstNode,
            lastNode: props.lastNode,
            direction: props.direction,
            segmentList: segments,
            isEmpty: props.isEmpty
        }, id);

        return Result.ok<Path>(path);

    }

}