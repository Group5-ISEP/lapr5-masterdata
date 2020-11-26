import Container from 'typedi';
import DriverTypeService from '../../../src/services/driverTypeService';
import MockDriverTypeRepo from '../../../src/repos/tests/mockDriverTypeRepo';
import { DriverType } from '../../../src/domain/driverType';
import IDriverTypeDTO from '../../../src/dto/IDriverTypeDTO';

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
})

