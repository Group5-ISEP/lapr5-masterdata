import { UniqueEntityID } from "../../../src/core/domain/UniqueEntityID"
import { DriverType } from "../../../src/domain/driverType"

describe("Driver Type domain test", () => {
    describe("Driver type creation", () => {
        it("should return the expected object with given parameters", () => {

            const idParam = 10
            const params = {
                description: "speaks english"
            }

            const result = DriverType.create(params, new UniqueEntityID(idParam))

            expect(result.isSuccess).toBeTruthy()

            const value = result.getValue()
            expect(value.id.toValue() === idParam).toBeTruthy()
            expect(value.description).toBe(params.description)
        })

        it("should return failure when creating driver type with empty description", () => {
            const idParam = 10
            const params = {
                description: ""
            }
            const result = DriverType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating driver type with description with only whitespaces", () => {
            const idParam = 10
            const params = {
                description: ""
            }
            const result = DriverType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating driver type with null description", () => {
            const idParam = 10
            const params = {
                description: null
            }
            const result = DriverType.create(params, new UniqueEntityID(idParam))

            expect(result.isFailure).toBeTruthy()
        })
    })
})