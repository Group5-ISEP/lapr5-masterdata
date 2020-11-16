import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import ILineDTO from "../dto/ILineDTO";

interface LineProps {
    code: string,
    name: string,
    terminalNodes: string[],
    colorRGB: { red: number, green: number, blue: number },
    allowedDriverTypes: string[],
    allowedVehicleTypes: string[]
}

export class Line extends AggregateRoot<LineProps>{

    get id(): UniqueEntityID {
        return this._id;
    }


    get code(): string {
        return this.props.code
    }

    get name(): string {
        return this.props.name
    }

    get terminalNodes(): string[] {
        return this.props.terminalNodes
    }

    get colorRGB(): { red: number, green: number, blue: number } {
        return this.props.colorRGB
    }

    get allowedDriverTypes(): string[] {
        return this.props.allowedDriverTypes
    }

    get allowedVehicleTypes(): string[] {
        return this.props.allowedVehicleTypes
    }

    private constructor(props: LineProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(lineDTO: ILineDTO, id?: UniqueEntityID): Result<Line> {
        const { code, name, terminalNodes, colorRGB, allowedDriverTypes, allowedVehicleTypes } = lineDTO
        if (!!name === false || name.trim().length === 0) {
            return Result.fail<Line>('Must provide a name')
        } else if (!code || code.trim().length === 0) {
            return Result.fail<Line>('Must provide a code')
        }
        else if (!terminalNodes || terminalNodes.length != 2) {
            return Result.fail<Line>('Must provide two end nodes of the line')
        }
        else {
            const line = new Line(lineDTO, id);
            return Result.ok<Line>(line)
        }
    }
}
