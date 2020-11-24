import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { VehicleType } from '../../../src/domain/vehicleType';

describe("Vehicle Type domain test", () => {
    describe("Driver type creation", () => {
        it("should return the expected object with given parameters", () => {

            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isSuccess).toBeTruthy()

            const value = result.getValue()
            expect(value.id.toValue() === idParam).toBeTruthy()
            expect(value.name).toBe(params.name)
            expect(value.autonomy).toBe(params.autonomy)
            expect(value.averageConsumption).toBe(params.averageConsumption)
            expect(value.averageSpeed).toBe(params.averageSpeed)
            expect(value.costByKm).toBe(params.costByKm)
            expect(value.emissions).toBe(params.emissions)
            expect(value.energySource).toBe(params.energySource)
        })

        it("should return failure when creating vehicle type with empty name", () => {
            const idParam = 10
            const params = {
                name: "  ",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid autonomy", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: null,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid average consumption", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: null,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid average speed", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: null,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid cost by km", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: null,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid emissions", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: null,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid autonomy", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: null,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "Gas"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating vehicle type with invalid energy source", () => {
            const idParam = 10
            const params = {
                name: "autocarro a gasoleo",
                autonomy: 10,
                averageConsumption: 10,
                averageSpeed: 10,
                costByKm: 10,
                emissions: 10,
                energySource: "something invalid"
            }

            const result = VehicleType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })
    })
})