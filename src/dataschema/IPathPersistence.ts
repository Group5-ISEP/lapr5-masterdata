import { Segment } from "../domain/segment";

export interface IPathPersistence {
    id: String;
    lineCode: String;
    direction: String;
    segmentList: [Segment];
    firstNode: String;
    lastNode: String;
}