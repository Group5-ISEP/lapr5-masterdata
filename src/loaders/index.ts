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

  const driverTypeSchema = {
    // compare with the approach followed in repos and services
    name: 'driverTypeSchema',
    schema: '../persistence/schemas/driverTypeSchema',
  };

  const roleController = {
    name: config.controller.role.name,
    path: config.controller.role.path
  }

  const driverTypeController = {
    name: config.controller.driverType.name,
    path: config.controller.driverType.path
  }
  const driverTypeService = {
    name: config.services.driverType.name,
    path: config.services.driverType.path
  }
  const driverTypeRepo = {
    name: config.repos.driverType.name,
    path: config.repos.driverType.path
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
      driverTypeSchema
    ],
    controllers: [
      roleController,
      driverTypeController
    ],
    repos: [
      roleRepo,
      userRepo,
      driverTypeRepo
    ],
    services: [
      roleService,
      driverTypeService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
