import { Segment } from "../domain/segment";

export interface IPathPersistence {
    lineCode: String;
    direction: String;
    segmentList: Segment[];
    firstNode: String;
    lastNode: String;
    isEmpty: Boolean
}