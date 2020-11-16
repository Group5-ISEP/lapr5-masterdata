import { Document, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { IDriverTypePersistence } from "../dataschema/IDriverTypePersistence";
import { DriverType } from "../domain/driverType";
import { DriverTypeMap } from "../mappers/DriverTypeMap";
import IDriverTypeRepo from "./IRepos/IDriverTypeRepo";

@Service()
export default class DriverTypeRepo implements IDriverTypeRepo {
    constructor(
        @Inject('driverTypeSchema') private driverTypeSchema: Model<IDriverTypePersistence & Document>,
    ) { }

    exists(t: DriverType): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    public async save(driverType: DriverType): Promise<DriverType> {

        const query = { desc: driverType.description }

        const driverTypeDocument = await this.driverTypeSchema.findOne(query)

        try {
            if (driverTypeDocument === null) {
                const rawDriverType: any = DriverTypeMap.toPersistence(driverType)

                const driverTypeCreated = await this.driverTypeSchema.create(rawDriverType)

                const returnValue = DriverType.create({ description: driverTypeCreated.description }, new UniqueEntityID(rawDriverType.id)).getValue();
                return returnValue
            } else {
                driverTypeDocument.description = driverType.description
                await driverTypeDocument.save()

                return driverType
            }
        } catch (error) {
            throw error
        }
    }

}