import PathService from '../../../src/services/pathService';
import MockPathRepo from '../../../src/repos/tests/mockPathRepo';


describe("Path Service Test", () => {
    describe("Path create test", () => {
        it("should return success when creating a to path with valid parameters", async () => {
            const service = new PathService(new MockPathRepo)

            const result = await service.createPath(
                {
                    lineCode: "201",
                    direction: "To",
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Boavista", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Boavista", endNode: "Aliados", distance: 1500, duration: 15, order: 2 }
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
                    firstNode: "Aliados",
                    lastNode: "Viso",
                    segmentList: [
                        { startNode: "Boavista", endNode: "Viso", distance: 2000, duration: 20, order: 2 },
                        { startNode: "Aliados", endNode: "Boavista", distance: 1500, duration: 15, order: 1 }
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Aliados",
                    lastNode: "Viso",
                    segmentList: [
                        { startNode: "Aliados", endNode: "Viso", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "  ",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: null,
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "  ", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: null, endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "  ", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: null, distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: -1, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: -1, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: 0 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: null, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: null, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Aliados", distance: 3000, duration: 20, order: null },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Boavista", endNode: "Aliados", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Boavista", distance: 3000, duration: 20, order: 1 },
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Fonte da Moura ", endNode: "Boavista", distance: 1500, duration: 15, order: 1 },
                        { startNode: "Boavista ", endNode: "Aliados", distance: 1000, duration: 10, order: 3 }
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Fonte da Moura ", endNode: "Boavista", distance: 1500, duration: 15, order: 3 },
                        { startNode: "Boavista ", endNode: "Aliados", distance: 1000, duration: 10, order: 4 }
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
                    firstNode: "Viso",
                    lastNode: "Aliados",
                    segmentList: [
                        { startNode: "Viso", endNode: "Fonte da Moura", distance: 2000, duration: 20, order: 1 },
                        { startNode: "Random", endNode: "Boavista", distance: 1500, duration: 15, order: 2 },
                        { startNode: "Boavista ", endNode: "Aliados", distance: 1000, duration: 10, order: 3 }
                    ],
                    isEmpty: false
                }
            )

            expect(result.isFailure).toBeTruthy()
        })


    })
})