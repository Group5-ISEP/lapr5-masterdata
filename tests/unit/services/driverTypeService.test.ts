import Container from 'typedi';
import DriverTypeService from '../../../src/services/driverTypeService';
import MockDriverTypeRepo from '../../../src/repos/tests/mockDriverTypeRepo';
import { DriverType } from '../../../src/domain/driverType';
import IDriverTypeDTO from '../../../src/dto/IDriverTypeDTO';

describe("Driver Type Service Test", () => {
    describe("Test create driver type", () => {
        it("should return success if given non empty description", async () => {

            const driverTypeService = new DriverTypeService(new MockDriverTypeRepo())

            const description = "test description"

            const driverTypeDTO: IDriverTypeDTO = { description: description }
            const result = await driverTypeService.createDriverType(driverTypeDTO)

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure if given empty description", async () => {

            const driverTypeService = new DriverTypeService(new MockDriverTypeRepo())

            const description = "  "

            const driverTypeDTO: IDriverTypeDTO = { description: description }
            const result = await driverTypeService.createDriverType(driverTypeDTO)

            expect(result.isFailure).toBeTruthy()
        })
    })
})

