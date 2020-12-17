import { Segment } from "../domain/segment";

export interface IPathPersistence {
    id: string,
    lineCode: String;
    direction: String;
    segmentList: Segment[];
    firstNode: String;
    lastNode: String;
    isEmpty: Boolean
}