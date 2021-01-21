import { Request, Response, NextFunction } from 'express';

export default interface INodeController {
  save(req: Request, res: Response, next: NextFunction);
  listNodes(req: Request, res: Response, next: NextFunction);
  getNode(req: Request, res: Response, next: NextFunction);
}