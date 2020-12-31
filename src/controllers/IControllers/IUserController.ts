import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
    login(req: Request, res: Response, next: NextFunction);
    getUser(req: Request, res: Response, next: NextFunction);
    createUser(req: Request, res: Response, next: NextFunction);
    updateUser(req: Request, res: Response, next: NextFunction);
}