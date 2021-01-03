import { Response, Request, NextFunction } from 'express';
import { Inject } from 'typedi';
import config from '../../config';
import middlewares from '../api/middlewares';
import { Result } from '../core/logic/Result';
import IUserDTO from '../dto/IUserDTO';
import IUserService from '../services/IServices/IUserService';
import IUserController from './IControllers/IUserController';

var jwt = require('jsonwebtoken');

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
                console.log("Failed to create user: " + req.body.email);
                return res.status(400).send("Create user error");
            }

            const userDTO = userOrError.getValue();
            return res.status(201).json(userDTO);

        } catch (error) {
            return next(error);
        }
    };

    public async login(req: Request, res: Response, next: NextFunction) {
        try {

            /*if (middlewares.isAuth) {
                console.error("There is already a logged user in this session");
                return res.status(401).send("Error: Already logged in user. Log out before logging in");
            }*/

            const userOrError = await this.userServiceInstance.getByEmail(req.body.email);

            if (userOrError.isFailure) {
                console.error("Login failed for: " + req.body.email);
                return res.status(401).send("Error: Non existing user");
            }

            const userDTO = userOrError.getValue();

            if (userDTO.password != req.body.password) {
                console.error("Invalid password for: " + req.body.email);
                return res.status(401).send("Error: Wrong password");
            }

            var token = jwt.sign(userDTO, config.jwtSecret);
            console.log(token);
            
            return res.status(200).json({
                token: token,
                userType: userDTO.type
            });

        } catch (error) {
            return next(error);
        }
    }

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
