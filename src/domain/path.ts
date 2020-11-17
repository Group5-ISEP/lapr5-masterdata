import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import { Segment } from "./segment";

interface PathProps {
    lineCode: string;
    direction: string;
    segmentList: [Segment];
    firstNode: string;
    lastNode: string;
}

export class Path extends AggregateRoot<PathProps> {
    //Not used but exists for inner methods
    get id (): UniqueEntityID {
        return this._id;
    }
    
    get lineCode (): string {
        return this.props.lineCode;
    }

    get direction (): string {
        return this.props.direction;
    }

    get segmentList (): [Segment] {
        return this.props.segmentList;
    }

    get firstNode (): string {
        return this.props.firstNode;
    }

    get lastNode (): string {
        return this.props.lastNode;
    }

    private constructor (props: PathProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: PathProps, id?: UniqueEntityID): Result<Path> {

        const guardedProps = [
            { argument: props.lineCode, argumentName: 'lineCode' },
            { argument: props.direction, argumentName: 'direction' },
            { argument: props.segmentList, argumentName: 'segmentList' },
            { argument: props.firstNode, argumentName: 'firstNode' },
            { argument: props.lastNode, argumentName: 'lastNode' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Path>(guardResult.message)
        }
        else {
            const path = new Path({
                ...props
            }, id);

            return Result.ok<Path>(path);
        }
    }
}