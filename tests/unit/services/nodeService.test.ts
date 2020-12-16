import NodeService from '../../../src/services/nodeService';
import MockNodeRepo from '../../../src/repos/tests/mockNodeRepo';
import INodeDTO from '../../../src/dto/INodeDTO';
import { NodeMap } from '../../../src/mappers/NodeMap';
import _ from 'lodash';

describe("Node Service Test", () => {
    describe("Create node test", () => {
        it("should return success when creating a node with valid parameters", async () => {

            const service = new NodeService(new MockNodeRepo())

            const result = await service.createNode(
                {
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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
                    id: undefined,
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

    describe("Get nodes list test", () => {
        const node1: INodeDTO = {
            id: undefined,
            name: "Fonte da Moura",
            shortName: "FTM",
            isDepot: false,
            isReliefPoint: false,
            latitude: 41.163665,
            longitude: -8.662789
        }
        const node2: INodeDTO = {
            id: undefined,
            name: "Boavista",
            shortName: "BOAV",
            isDepot: false,
            isReliefPoint: false,
            latitude: 41.157720,
            longitude: -8.629293
        }


        const mockRepo = new MockNodeRepo()


        beforeAll(() => {
            let list = [
                NodeMap.toDomain(node1),
                NodeMap.toDomain(node2)
            ]
            mockRepo.list.push(...list)
        })

        it("should return a list with the expected elements", async () => {

            const service = new NodeService(mockRepo)

            const result = (await service.listNodes()).getValue()

            expect(result.find(node => node.shortName === node1.shortName)).toBeTruthy()
            expect(result.find(node => node.shortName === node2.shortName)).toBeTruthy()
            expect(result.length).toBe(2)
        })
    })
})