import ISegmentDTO from "./ISegmentDTO";

export default interface IPathDTO {
    lineCode: string;
    direction: string;
    segmentList: ISegmentDTO[];
    firstNode: string;
    lastNode: string;
    isEmpty: boolean
}
