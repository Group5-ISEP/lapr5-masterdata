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
  const nodeSchema = {
    name: 'nodeSchema',
    schema: '../persistence/schemas/nodeSchema',
  }

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

  const vehicleTypeController = {
    name: config.controller.vehicleType.name,
    path: config.controller.vehicleType.path
  }
  const vehicleTypeService = {
    name: config.services.vehicleType.name,
    path: config.services.vehicleType.path
  }


  const nodeController = {
    name: config.controller.node.name,
    path: config.controller.node.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const nodeRepo = {
    name: config.repos.node.name,
    path: config.repos.node.path
  }


  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const nodeService = {
    name: config.services.node.name,
    path: config.services.node.path
  }

  //TO DO:
  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      driverTypeSchema,
      nodeSchema
    ],
    controllers: [
      roleController,
      driverTypeController,
      vehicleTypeController,
      nodeController
    ],
    repos: [
      roleRepo,
      userRepo,
      driverTypeRepo,
      nodeRepo
    ],
    services: [
      roleService,
      driverTypeService,
      vehicleTypeService,
      nodeService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
