import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { Guard } from "../core/logic/Guard";


interface UserProps {
    email: string;
    password: string;
    type: string;
}

export class User extends AggregateRoot<UserProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get userId (): UserId {
        return UserId.caller(this.id)
    }

    get email (): string {
        return this.props.email;
    }

    get password(): string {
        return this.props.password;
    }
    
    set password(pass: string) {
        this.props.password = pass;
    }
    
    get type (): string {
        return this.props.type;
    }
  
    set type (value: string) {
        this.props.type = value;
    }

    private constructor (props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

        const guardedProps = [
            { argument: props.password, argumentName: 'password' },
            { argument: props.email, argumentName: 'email' },
            { argument: props.type, argumentName: 'type' }
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<User>(guardResult.message)
        }     
        else {
            const user = new User({
            ...props
            }, id);

            return Result.ok<User>(user);
        }
    }
}