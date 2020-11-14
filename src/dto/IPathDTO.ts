
export default interface IPathDTO {
    name: string;
    segmentList:
    [{
        startNode: string,
        endNode: string,
        duration: number,
        distance: number,
        order: number,
    }];
    firstNode: string;
    lastNode: string;
}
