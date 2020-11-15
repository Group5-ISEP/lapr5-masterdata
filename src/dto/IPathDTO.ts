import { Segment } from "../domain/segment";

export default interface IPathDTO {
    id: string;
    lineCode: string;
    direction: string;
    segmentList: [Segment];
    firstNode: string;
    lastNode: string;
}
