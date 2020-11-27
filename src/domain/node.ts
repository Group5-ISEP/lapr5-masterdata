import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface NodeProps {
    shortName: string;
    name: string;
    isDepot: boolean;
    isReliefPoint: boolean;
    longitude: number;
    latitude: number;
}

export class Node extends AggregateRoot<NodeProps>{

    get shortName(): string {
        return this.props.shortName;
    }

    get name(): string {
        return this.props.name;
    }

    get isDepot(): boolean {
        return this.props.isDepot;
    }

    get isReliefPoint(): boolean {
        return this.props.isReliefPoint;
    }

    get latitude(): number {
        return this.props.latitude;
    }

    get longitude(): number {
        return this.props.longitude;
    }

    private constructor(props: NodeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: NodeProps, id?: UniqueEntityID): Result<Node> {

        const { name, shortName, latitude, longitude } = props


        if (!name || name.trim().length <= 0) {
            return Result.fail<Node>("Node name must be specified")
        }
        else if (!shortName || shortName.trim().length <= 0) {
            return Result.fail<Node>("Node shortname must be specified")
        }
        else if (!latitude || latitude < -180 || latitude > 180) {
            return Result.fail<Node>("Must be specified latitude between -180 and 180")
        }
        else if (!longitude || longitude < -90 || longitude > 90) {
            return Result.fail<Node>("Must be specified longitude between -90 and 90")
        }
        else {
            const node = new Node({
                ...props
            },
                id
            );

            return Result.ok<Node>(node);
        }
    }
}
