import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import IDriverTypeDTO from "../dto/IDriverTypeDTO";

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

    set name(value: string) {
        this.props.description = value;
    }

    private constructor(props: DriverTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(driverTypeDTO: IDriverTypeDTO, id?: UniqueEntityID): Result<DriverType> {
        const description = driverTypeDTO.description;

        if (!!description === false || description.length === 0) {
            return Result.fail<DriverType>('Must provide a driver type description')
        } else {
            const driverType = new DriverType({ description: description }, id);
            return Result.ok<DriverType>(driverType)
        }
    }

}