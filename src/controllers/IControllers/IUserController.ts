import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
    getUser(req: Request, res: Response, next: NextFunction);
    createUser(req: Request, res: Response, next: NextFunction);
    updateUser(req: Request, res: Response, next: NextFunction);
}