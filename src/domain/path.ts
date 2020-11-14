import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
//import { UserId } from "./userId"; Create path id instead??
import { Guard } from "../core/logic/Guard";
import { Segment } from "./segment";

interface PathProps {
    name: string;
    segmentList: [Segment];
    firstNode: string;
    lastNode: string;
    //isEmpty: boolean;
}

export class Path extends AggregateRoot<PathProps> {
    /*get id(): UniqueEntityID {
        return this._id;
    }

    get userId(): UserId {
        return UserId.caller(this.id)
    }*/

    get name(): string {
        return this.props.name;
    }

    get segmentList(): [Segment] {
        return this.props.segmentList;
    }

    get firstNode(): string {
        return this.props.firstNode;
    }

    get lastNode(): string {
        return this.props.lastNode;
    }

    private constructor(props: PathProps) {
        super(props);
    }

    public static create(props: PathProps, id?: UniqueEntityID): Result<Path> {

        const guardedProps = [
            { argument: props.name, argumentName: 'name' },
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
            });

            return Result.ok<Path>(path);
        }
    }
}