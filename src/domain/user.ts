import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
//import { Role } from "./role";
//import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";


interface UserProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
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

    get firstName (): string {
        return this.props.firstName
    }

    set firstName(fname: string) {
        this.props.firstName = fname;
    }

    get lastName (): string {
        return this.props.lastName;
    }

    set lastName(lname: string) {
        this.props.lastName = lname;
    }

    get password(): string {
        return this.props.password;
    }
    
    set password(pass: string) {
        this.props.password = pass;
    }
    
    get role (): string {
        return this.props.role;
    }
  
    set role (value: string) {
        this.props.role = value;
    }

    private constructor (props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

        const guardedProps = [
            { argument: props.firstName, argumentName: 'firstName' },
            { argument: props.lastName, argumentName: 'lastName' },
            { argument: props.password, argumentName: 'password' },
            { argument: props.email, argumentName: 'email' },
            { argument: props.role, argumentName: 'role' }
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