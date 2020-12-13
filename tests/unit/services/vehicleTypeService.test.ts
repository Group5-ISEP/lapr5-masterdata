import VehicleTypeService from '../../../src/services/vehicleTypeService';
import MockVehicleTypeRepo from '../../../src/repos/tests/mockVehicleTypeRepo';
import IVehicleTypeDTO from '../../../src/dto/IVehicleTypeDTO';
import { VehicleTypeMap } from '../../../src/mappers/VehicleTypeMap';


describe("Vehicle Type Service Test", () => {
    describe("Create vehicle type test", () => {
        it("should return success when given valid parameters", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure when given empty name", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "  ",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given null name", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: null,
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given negative autonomy", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: -10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given negative average consumption", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: -10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given negative average speed", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: -10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given negative cost by km", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: -10,
                    emissions: 10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given negative emissions", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: -10,
                    energySource: "Gas"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when given invalid energy source", async () => {

            const service = new VehicleTypeService(new MockVehicleTypeRepo())

            const result = await service.createVehicleType(
                {
                    name: "autocarro a gasoleo",
                    autonomy: 10,
                    averageConsumption: 10,
                    averageSpeed: 10,
                    costByKm: 10,
                    emissions: 10,
                    energySource: "Water"
                }
            )

            expect(result.isFailure).toBeTruthy()
        })
    })

    describe("Get vehicle types", () => {

        const vt1: IVehicleTypeDTO = {
            name: "autocarro a gasoleo",
            autonomy: 10,
            averageConsumption: 10,
            averageSpeed: 10,
            costByKm: 10,
            emissions: 10,
            energySource: "Gas"
        }

        const repo = new MockVehicleTypeRepo()
        repo.mockList.push(VehicleTypeMap.toDomain(vt1))


        it("should return a list with the expected elements", async () => {
            const service = new VehicleTypeService(repo)

            const result = (await service.listVehicleTypes()).getValue()

            expect(result.length).toBe(1)
            expect(result.find(vt => vt.name === vt1.name)).toBeTruthy()
        })
    })
})