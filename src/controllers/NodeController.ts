import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";
import { Node } from '../domain/node';
import NodeService from '../services/NodeService';
import INodeController from "./IControllers/INodeController";

export default class NodeController implements INodeController{
    constructor(
        @Inject(config.services.node.name) private nodeServiceInstance : NodeService
    ) {}

    public async save(req: Request, res: Response, next: NextFunction) {
        try{
          const NodeOrError = await this.nodeServiceInstance.createNode(req.body as Node);
        
          if (NodeOrError.isFailure) {
            return res.status(402).send();
          }
        
        } catch (error) {
            return next(error);
        }
    }
    
    ListNodes(req: any, res: any, next: any) {
        throw new Error("Method not implemented.");
    }
}