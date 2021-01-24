import { Request, Response, NextFunction } from 'express';

export default interface IImportController {
    importFile(req: Request, res: Response, next: NextFunction);
}