import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

interface DriverTypeProps {
    description: string
}

export class DriverType extends AggregateRoot<DriverTypeProps>{

    get id(): UniqueEntityID {
        return this._id;
    }

    get description(): string {
        return this.props.description;
    }

    private constructor(props: DriverTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(driverTypeProps: DriverTypeProps, id?: UniqueEntityID): Result<DriverType> {
        const description = driverTypeProps.description;

        if (!!description === false || description.length === 0) {
            return Result.fail<DriverType>('Must provide a driver type description')
        } else {
            const driverType = new DriverType(driverTypeProps, id);
            return Result.ok<DriverType>(driverType)
        }
    }

}