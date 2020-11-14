import { Request, Response, NextFunction } from 'express';

export default interface IPathController  {
  createPath(req: Request, res: Response, next: NextFunction);
}