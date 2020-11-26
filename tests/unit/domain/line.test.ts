import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { Line } from '../../../src/domain/line';

describe("Line Test", () => {
    describe("Line creation test", () => {
        it("should return success when all valid parameters are given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure when empty code is given", () => {

            const result = Line.create(
                {
                    code: "  ",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null code is given", () => {

            const result = Line.create(
                {
                    code: null,
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null name is given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: null,
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when empty name is given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "  ",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null allowed driver types is given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: null,
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null allowed vehicle types is given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: null,
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null color is given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: null,
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when negative RGB numbers are given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: -1,
                        green: -1,
                        blue: -1,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when RGB numbers over 255 are given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 256,
                        green: 256,
                        blue: 256,
                    },
                    terminalNodes: ["Aliados", "Viso"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when no 2 end nodes are given", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: ["Aliados"]
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when terminal nodes list is null", () => {

            const result = Line.create(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: {
                        red: 10,
                        green: 10,
                        blue: 10,
                    },
                    terminalNodes: null
                },
                new UniqueEntityID(1)
            )

            expect(result.isFailure).toBeTruthy()
        })
    })
})