import LineService from '../../../src/services/lineService';
import MockLineRepo from '../../../src/repos/tests/mockLineRepo';
import ILineDTO from '../../../src/dto/ILineDTO';
import { LineMap } from '../../../src/mappers/LineMap';

describe("Line Service Test", () => {
    describe("Create Line test", () => {

        it("should return success when all valid parameters are given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure when empty code is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null code is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null name is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when empty name is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null allowed driver types is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null allowed vehicle types is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when null color is given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
                {
                    code: "201",
                    name: "Viso_Aliados",
                    allowedDriverTypes: [],
                    allowedVehicleTypes: [],
                    colorRGB: null,
                    terminalNodes: ["Aliados", "Viso"]
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when negative RGB numbers are given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when RGB numbers over 255 are given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when no 2 end nodes are given", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when terminal nodes list is null", async () => {

            const service = new LineService(new MockLineRepo())

            const result = await service.createLine(
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
                }
            )

            expect(result.isFailure).toBeTruthy()
        })
    })

    describe("Get lines test", () => {


        const line1: ILineDTO = {
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
        }

        const mockRepo = new MockLineRepo()

        beforeAll(() => {
            mockRepo.mockLines.push(LineMap.toDomain(line1))
        })

        it("should return list with expected lines", async () => {

            const service = new LineService(mockRepo)

            const result = (await service.listLines()).getValue()

            expect(result.length).toBe(1)
            expect(result.find(line => line.code === line1.code)).toBeTruthy()
        })
    })
})