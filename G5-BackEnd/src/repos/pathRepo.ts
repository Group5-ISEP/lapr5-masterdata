import { Service, Inject } from 'typedi';

import IPathRepo from "../repos/IRepos/IPathRepo";
import { Path } from "../domain/path";
import { PathMap } from "../mappers/PathMap";

import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

@Service()
export default class PathRepo implements IPathRepo {
    private models: any;

    constructor(
        @Inject('pathSchema') private pathSchema : Model<IPathPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
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

        const query = { id: path.id }; 

        const pathDocument = await this.pathSchema.findOne( query );

        try {
            if (pathDocument === null ) {
                const rawPath: any = PathMap.toPersistence(path);

                const pathCreated = await this.pathSchema.create(rawPath);

                return PathMap.toDomain(pathCreated);
            } else {
                pathDocument.id = path.id;
                pathDocument.segmentList = path.segmentList;
                pathDocument.firstNode = path.firstNode;
                pathDocument.lastNode = path.lastNode;
                await pathDocument.save();

                return path;
            }
        } catch (err) {
            throw err;
        }
      }

    public async findByLine(line: string): Promise<Path[]> {

        const query = { lineCode: line };
        const pathRecord = this.pathSchema.find(query);

        if (pathRecord != null) {
            var paths = [];
            (await pathRecord).forEach(async function (value) {
                const p = await PathMap.toDomain(value);
                paths.push(p);
            });
            //console.log(paths);
            return paths;
        }
        else return null;
    }
}