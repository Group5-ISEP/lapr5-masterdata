import { Node } from "../../domain/node";
import INodeRepo from "../IRepos/INodeRepo";

export default class MockNodeRepo implements INodeRepo {

    list: Node[] = []

    constructor() { }

    public async getNodeByShortName(shortName: string): Promise<Node> {
        return this.list.find(node => node.shortName === shortName)[0];
    }

    public async save(node: Node): Promise<Node> {
        return node
    }
    public async getNodes(): Promise<Node[]> {
        return this.list
    }
    exists(t: Node): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}