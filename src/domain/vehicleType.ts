import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

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

    private constructor(props: VehicleTypeProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(vehicleTypeProps: VehicleTypeProps, id?: UniqueEntityID): Result<VehicleType> {
        const { name, autonomy, averageConsumption, averageSpeed, costByKm, emissions, energySource } = vehicleTypeProps
        if (!!name === false || name.trim().length === 0) {
            return Result.fail<VehicleType>('Must provide a Vehicle type name')
        }
        else if (!autonomy || !averageConsumption || !averageSpeed || !costByKm || !emissions ||
            autonomy < 0 || averageConsumption < 0 || averageSpeed < 0 || costByKm < 0 || emissions < 0) {
            return Result.fail<VehicleType>('Must provide positive numbers')
        } else if (!energySource || /(Diesel)|(Gasoline)|(Electric)|(GPL)|(Gas)/.test(energySource) === false) {
            return Result.fail<VehicleType>('Energy source must be of types Diesel, Gasoline, Electric, GPL, Gas')
        }
        else {
            const vehicleType = new VehicleType(vehicleTypeProps, id);
            return Result.ok<VehicleType>(vehicleType)
        }
    }

}