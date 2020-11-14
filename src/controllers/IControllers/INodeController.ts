import { Request, Response, NextFunction } from 'express';

export default interface INodeController  {
  save(req: Request, res: Response, next: NextFunction);
  ListNodes (req: Request, res: Response, next: NextFunction);
}