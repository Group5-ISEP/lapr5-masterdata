import { Request, Response, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from "../../config";
import { Result } from '../core/logic/Result';
import { Node } from '../domain/node';
import INodeService from '../services/IServices/INodeService';
import INodeController from "./IControllers/INodeController";

export default class NodeController implements INodeController{
    public constructor(
        @Inject(config.services.node.name) private nodeServiceInstance : INodeService
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
    };
    
    public async listNodes(req: Request, res: Response, next: NextFunction) {
            try {
                const nodeOrError = await this.nodeServiceInstance.listNodes(req.body.shortName) as Result<Node>;
    
                if (nodeOrError.isFailure) {
                    return res.status(400).send();
                }
            }
            catch (e) {
                return next(e);
            }
    };
}