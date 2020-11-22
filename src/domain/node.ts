import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Guard } from "../core/logic/Guard";
import { Result } from "../core/logic/Result";

interface NodeProps{
    shortName: String;
    name: String;
    depot: Boolean;
    reliefPoint: Boolean;
    longitude: Number;
    latitude: Number;
}

export class Node extends AggregateRoot<NodeProps>{
    [x: string]: any;
    isFailure: any;
    
    get shortName (): String {
        return this.props.shortName;
    }

    get name(): String {
        return this.props.name;
    }
   
    get depot(): Boolean {
        return this.props.depot;
    }
   
    get reliefPoint(): Boolean {
        return this.props.reliefPoint;
    }

    get latitude(): Number {
        return this.props.latitude;
    }

    get longitude(): Number {
        return this.props.longitude;
    }

    private constructor(props: NodeProps, id?: UniqueEntityID){
        super(props, id);
    }
    
    public static create(props: NodeProps, id?: UniqueEntityID): Result<Node>{

        const guardedProps = [
            { argument: props.shortName, argumentName: 'shortName'},
            { argument: props.name, argumentName: 'name'},
            { argument: props.depot, argumentName: 'depot'},
            { argument: props.reliefPoint, argumentName: 'reliefPoint'},
            { argument: props.longitude, argumentName: 'longitude'},
            { argument: props.latitude, argumentName: 'latitude'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Node>(guardResult.message)
        }
        else {
            const node = new Node({
                ...props
            });

            return Result.ok<Node>(node);
        }
    }    
}
