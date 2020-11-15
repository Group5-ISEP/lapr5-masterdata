import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";

interface VehicleTypeProps {
    name: string,
    autonomy: number,
    costByKm: number,
    averageConsumption: number,
    averageSpeed: number,
    emissions: number,
    energySource: string
}

export class VehicleType extends AggregateRoot<VehicleTypeProps>{

    get id(): UniqueEntityID {
        return this._id;
    }


    get name(): string {
        return this.props.name
    }

    get autonomy(): number {
        return this.props.autonomy
    }
    get costByKm(): number {
        return this.props.costByKm
    }
    get averageConsumption(): number {
        return this.props.averageConsumption
    }
    get averageSpeed(): number {
        return this.props.averageSpeed
    }
    get emissions(): number {
        return this.props.emissions
    }
    get energySource(): string {
        return this.props.energySource
    }

    set name(value: string) {
        this.props.name = value;
    }
    set autonomy(value: number) {
        this.props.autonomy = value;
    }
    set costByKm(value: number) {
        this.props.costByKm = value;
    }
    set averageConsumption(value: number) {
        this.props.averageConsumption = value;
    }
    set averageSpeed(value: number) {
        this.props.averageSpeed = value;
    }
    set emissions(value: number) {
        this.props.emissions = value;
    }
    set energySource(value: string) {
        this.props.energySource = value;
    }

    private constructor(props: VehicleTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(vehicleTypeDTO: IVehicleTypeDTO, id?: UniqueEntityID): Result<VehicleType> {
        const { name } = vehicleTypeDTO
        //TODO - IMPLEMENT VERIFICATIONS TO ALL THE PARAMETERS
        if (!!name === false || name.length === 0) {
            return Result.fail<VehicleType>('Must provide a Vehicle type name')
        } else {
            const vehicleType = new VehicleType(vehicleTypeDTO, id);
            return Result.ok<VehicleType>(vehicleType)
        }
    }

}