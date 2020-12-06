import PathService from '../../../src/services/pathService';
import MockPathRepo from '../../../src/repos/tests/mockPathRepo';
import IPathDTO from '../../../src/dto/IPathDTO';
import { PathMap } from '../../../src/mappers/PathMap';


describe("Path Service Test", () => {
    describe("Path create test", () => {
        it("should return success when creating a to path with valid parameters", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "BOAV", distance: 2000, duration: 20, order: 1 },
                        { startNode: "BOAV", endNode: "ALIAD", distance: 1500, duration: 15, order: 2 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return success when creating a from path with valid parameters", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "From",
                    firstNode: "ALIAD",
                    lastNode: "VIS",
                    segmentList: [
                        { startNode: "BOAV", endNode: "VIS", distance: 2000, duration: 20, order: 2 },
                        { startNode: "ALIAD", endNode: "BOAV", distance: 1500, duration: 15, order: 1 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return success when creating a empty to path with valid parameters", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return success when creating a empty from path with valid parameters", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "From",
                    firstNode: "ALIAD",
                    lastNode: "VIS",
                    segmentList: [
                        { startNode: "ALIAD", endNode: "VIS", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure when creating a path with empty line code", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "  ",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with null line code", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: null,
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with invalid direction", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "whatever",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with empty direction", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "  ",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with null direction", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: null,
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with empty first node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "  ",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with null first node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: null,
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with empty last node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "  ",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with null last node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: null,
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with empty segment list", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with empty first node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "  ", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with null first node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: null, endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with empty end node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "  ", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with null end node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: null, distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with negative distance", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: -1, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with negative duration", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: -1, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with 0 order value", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: 0 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with null distance", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: null, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with null duration", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: null, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a segment with null order", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "ALIAD", distance: 3000, duration: 20, order: null },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path which the first segment doesnt have start node equal to path first node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "BOAV", endNode: "ALIAD", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path which last segment doesnt have end node equal to path last node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "BOAV", distance: 3000, duration: 20, order: 1 },
                    ],
                    isEmpty: true
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with segments with equal order", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Fonte da Moura ", endNode: "BOAV", distance: 1500, duration: 15, order: 1 },
                        { startNode: "BOAV ", endNode: "ALIAD", distance: 1000, duration: 10, order: 3 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with segments with order above number of segments", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Fonte da Moura ", endNode: "BOAV", distance: 1500, duration: 15, order: 3 },
                        { startNode: "BOAV ", endNode: "ALIAD", distance: 1000, duration: 10, order: 4 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a path with a middle segment not having the start node equal to the previous segment end node", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "VIS",
                    lastNode: "ALIAD",
                    segmentList: [
                        { startNode: "VIS", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Random", endNode: "BOAV", distance: 1500, duration: 15, order: 2 },
                        { startNode: "BOAV ", endNode: "ALIAD", distance: 1000, duration: 10, order: 3 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isFailure).toBeTruthy()
        })


    })

    describe("Get paths by line test", () => {

        const path1: IPathDTO = {
            lineCode: "201",
            direction: "To",
            firstNode: "VIS",
            lastNode: "ALIAD",
            segmentList: [
                { startNode: "VIS", endNode: "BOAV", distance: 2000, duration: 20, order: 1 },
                { startNode: "BOAV", endNode: "ALIAD", distance: 1500, duration: 15, order: 2 }
            ],
            isEmpty: false
        }

        const path2: IPathDTO = {
            lineCode: "201",
            direction: "From",
            firstNode: "ALIAD",
            lastNode: "VIS",
            segmentList: [
                { startNode: "BOAV", endNode: "VIS", distance: 2000, duration: 20, order: 2 },
                { startNode: "ALIAD", endNode: "BOAV", distance: 1500, duration: 15, order: 1 }
            ],
            isEmpty: false
        }

        const mockRepo = new MockPathRepo()

        beforeAll(async () => {
            let pathlist = [
                await PathMap.toDomain(path1),
                await PathMap.toDomain(path2)
            ]
            mockRepo.pathList.push(...pathlist)
        })

        it("should return a list with the expected paths", async () => {

            const service = new PathService(mockRepo)

            const result = (await service.getPathsOfLine("201")).getValue()

            expect(result.length).toBe(2)

            expect(result.find(path => path.lineCode === path1.lineCode && path.direction === path1.direction)).toBeTruthy()
            expect(result.find(path => path.lineCode === path2.lineCode && path.direction === path2.direction)).toBeTruthy()
        })

    })
})