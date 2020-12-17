import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";

interface LineProps {
    code: string,
    name: string,
    terminalNodes: string[],
    colorRGB: { red: number, green: number, blue: number },
    allowedDriverTypes: string[],
    allowedVehicleTypes: string[]
}

export class Line extends AggregateRoot<LineProps>{

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

    public static create(lineProps: LineProps, id?: UniqueEntityID): Result<Line> {
        const { code, name, terminalNodes, allowedDriverTypes, allowedVehicleTypes, colorRGB } = lineProps
        if (!!name === false || name.trim().length === 0) {
            return Result.fail<Line>('Must provide a name')
        } else if (!code || code.trim().length === 0) {
            return Result.fail<Line>('Must provide a code')
        }
        else if (!terminalNodes || terminalNodes.length != 2) {
            return Result.fail<Line>('Must provide two end nodes of the line')
        }
        else if (!allowedDriverTypes || !allowedVehicleTypes) {
            return Result.fail<Line>('Lists of allowed vehicle types and driver types cant be null')
        }
        else if (!colorRGB || colorRGB.blue < 0 || colorRGB.green < 0 || colorRGB.red < 0 || colorRGB.blue > 255 || colorRGB.green > 255 || colorRGB.red > 255) {
            return Result.fail<Line>('Must provide RGB color with red, green, blue values between 0 and 255')
        }
        else {
            const line = new Line(lineProps, id);
            return Result.ok<Line>(line)
        }
    }
}
