import { Service, Inject } from 'typedi';

import IPathRepo from "../repos/IRepos/IPathRepo";
import { Path } from "../domain/path";
import { PathId } from '../domain/pathId';
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

    public async exists(pathId: PathId | string ): Promise<boolean> {

        const idX = pathId instanceof PathId ? (<PathId>pathId).id.toValue() : pathId;

        //path.id.toString()??
        const query = { id: idX }; 
        const pathDocument = await this.pathSchema.findOne( query );

        return !!pathDocument === true;
    }

    public async save(path: Path): Promise<Path> {

        const query = { id: path.id.toString()}; 

        const pathDocument = await this.pathSchema.findOne( query );

        try {
            if (pathDocument === null ) {
                const rawPath: any = PathMap.toPersistence(path);

                const pathCreated = await this.pathSchema.create(rawPath);

                return PathMap.toDomain(pathCreated);
            } else {
                pathDocument.id = path.id.toString();
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

    public async findById(pathId: PathId | string): Promise<Path> {

        const query = { id: pathId };
        const pathRecord = this.pathSchema.findOne(query);

        if (pathRecord != null) {
            return PathMap.toDomain(pathRecord);
        }
        else return null;
    }
}