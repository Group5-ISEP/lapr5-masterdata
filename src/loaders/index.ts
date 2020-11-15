import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
    };

    const pathSchema = {
        name: 'pathSchema',
        schema: '../persistence/schemas/pathSchema',
    };

    const pathController = {
        name: config.controller.path.name,
        path: config.controller.path.path
    }

    const pathRepo = {
        name: config.repos.path.name,
        path: config.repos.path.path
    }

    const pathService = {
        name: config.services.path.name,
        path: config.services.path.path
    }

  const roleController = {
    name: config.controller.role.name,
    path: config.controller.role.path
  }

  const driverTypeController = {
    name: config.controller.driverType.name,
    path: config.controller.driverType.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  await dependencyInjectorLoader({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            pathSchema
        ],
        controllers: [
            roleController,
            driverTypeController,
            pathController
        ],
        repos: [
            roleRepo,
            userRepo,
            pathRepo
        ],
        services: [
            roleService,
            pathService
        ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
