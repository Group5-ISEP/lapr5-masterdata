import { Service, Inject } from 'typedi';

import IPathRepo from "./IRepos/IPathRepo";
import { Path } from "../domain/path";
import { PathMap } from "../mappers/PathMap";

import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

@Service()
export default class PathRepo implements IPathRepo {
    private models: any;

    constructor(
        @Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    //Implement by checking mongodb id
    public async exists(path: Path): Promise<boolean> {
        /*
        const pathId = path.id;

        const query = { id: pathId };
        const pathDocument = await this.pathSchema.findOne( query );
        */
        return false;//!!pathDocument === true;
    }


    public async save(path: Path): Promise<Path> {

        try {
            const rawPath: any = PathMap.toPersistence(path);

            const pathCreated = await this.pathSchema.create(rawPath);

            return PathMap.toDomain(pathCreated);

        } catch (err) {
            throw err;
        }
    }

    public async findByLine(line: string): Promise<Path[]> {

        try {
            const query = { lineCode: line };
            const pathRecords = await this.pathSchema.find(query);
            const pathList = pathRecords.map(doc => PathMap.toDomain(doc))
            return pathList
        } catch (error) {
            throw error
        }

    }
}