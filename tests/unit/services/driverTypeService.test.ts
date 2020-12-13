import DriverTypeService from '../../../src/services/driverTypeService';
import MockDriverTypeRepo from '../../../src/repos/tests/mockDriverTypeRepo';
import IDriverTypeDTO from '../../../src/dto/IDriverTypeDTO';
import { DriverTypeMap } from '../../../src/mappers/DriverTypeMap';

describe("Driver Type Service Test", () => {
    describe("Test create driver type", () => {
        it("should return success if given non empty description", async () => {

            const service = new DriverTypeService(new MockDriverTypeRepo())

            const result = await service.createDriverType(
                {
                    description: "speaks english"
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure if given empty description", async () => {

            const service = new DriverTypeService(new MockDriverTypeRepo())

            const result = await service.createDriverType(
                {
                    description: "   "
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure if given null description", async () => {

            const service = new DriverTypeService(new MockDriverTypeRepo())

            const result = await service.createDriverType(
                {
                    description: null
                }
            )

            expect(result.isFailure).toBeTruthy()
        })
    })

    describe("Test get driver types", () => {

        const dt1: IDriverTypeDTO = { description: "speaks enlish" }

        const repo = new MockDriverTypeRepo()
        repo.mockList.push(DriverTypeMap.toDomain(dt1))

        it("should return a list with the expected elements", async () => {
            const service = new DriverTypeService(repo)

            const result = (await service.listDriverTypes()).getValue()

            expect(result.length).toBe(1)
            expect(result.find(dt => dt.description === dt1.description)).toBeTruthy()
        })
    })
})

