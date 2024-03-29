import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";
import INodeDTO from '../dto/INodeDTO';
import INodeService from '../services/IServices/INodeService';
import INodeController from "./IControllers/INodeController";

export default class NodeController implements INodeController {
    public constructor(
        @Inject(config.services.node.name) private nodeServiceInstance: INodeService
    ) { }

    public async save(req: Request, res: Response, next: NextFunction) {
        try {
            const nodeOrError = await this.nodeServiceInstance.createNode(req.body as INodeDTO);

            if (nodeOrError.isFailure) {
                return res.status(409).send(nodeOrError.errorValue());
            }

            const nodeDTO = nodeOrError.getValue();
            return res.status(201).json(nodeDTO);

        } catch (error) {
            return next(error);
        }
    };

    public async listNodes(req: Request, res: Response, next: NextFunction) {

        try {
            const nodesOrError = await this.nodeServiceInstance.listNodes();
            const nodesDTO = nodesOrError.getValue();
            return res.status(200).json(nodesDTO);
        }
        catch (e) {
            return next(e);
        }
    };

    public async getNode(req: Request, res: Response, next: NextFunction) {

        try {
            const nodeOrError = await this.nodeServiceInstance.getNode(req.params.id);
            if (nodeOrError.isFailure)
                return res.status(409).send(nodeOrError.errorValue())
            const nodeDTO = nodeOrError.getValue();
            return res.status(200).json(nodeDTO);
        }
        catch (e) {
            return next(e);
        }
    };
}