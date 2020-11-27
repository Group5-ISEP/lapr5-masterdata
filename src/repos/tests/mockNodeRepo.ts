import { Node } from "../../domain/node";
import INodeRepo from "../IRepos/INodeRepo";

export default class MockNodeRepo implements INodeRepo {
    constructor() { }

    public async save(node: Node): Promise<Node> {
        return node
    }
    listNodes(name: string): Promise<Node[]> {
        throw new Error("Method not implemented.");
    }
    exists(t: Node): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}