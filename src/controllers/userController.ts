import { Response, Request, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IUserDTO from '../dto/IUserDTO';
import IUserService from '../services/IServices/IUserService';
import IUserController from './IControllers/IUserController';

export default class UserController implements IUserController {
    public constructor(
        @Inject(config.services.user.name) private userServiceInstance: IUserService
    ) { }

    public async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.getByEmail(req.body.email) as Result<IUserDTO>;

            if (userOrError.isFailure) {
                return res.status(400).send();
            }

            const userDTO = userOrError.getValue();
            return res.status(201).json(userDTO);
        }
        catch (error) {
            return next(error);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO);

            if (userOrError.isFailure) {
                return res.status(402).send();
            }

            const userDTO = userOrError.getValue();
            return res.status(201).json(userDTO);

        } catch (error) {
            return next(error);
        }
    };

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userOrError = await this.userServiceInstance.updateUser(req.body as IUserDTO) as Result<IUserDTO>;

            if (userOrError.isFailure) {
                return res.status(404).send();
            }

            const userDTO = userOrError.getValue();
            return res.status(201).json(userDTO);
        }
        catch (e) {
            return next(e);
        }
    };
}
