import NodeService from '../../../src/services/nodeService';
import MockNodeRepo from '../../../src/repos/tests/mockNodeRepo';

describe("Node Service Test", () => {
    describe("Create node test", () => {
        it("should return success when creating a node with valid parameters", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isSuccess).toBeTruthy()
        })

        it("should return failure when creating a node with empty name", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "  ",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with null name", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: null,
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with empty shortname", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "  ",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with null shortname", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: null,
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with null latitude", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: null,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with null longitude", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: null
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with latitude less than -180", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: -192.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with latitude above 180", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 187.0000,
                    longitude: 47.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with longitude below -90", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: -100.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })

        it("should return failure when creating a node with longitude above 90", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    name: "Paredes",
                    shortName: "PRDS",
                    isDepot: false,
                    isReliefPoint: false,
                    latitude: 147.0000,
                    longitude: 107.1546
                }
            )

            expect(result.isFailure).toBeTruthy()
        })


    })
})