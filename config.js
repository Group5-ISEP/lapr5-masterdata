import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controller: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    driverType: {
      name: "DriverTypeController",
      path: "../controllers/driverTypeController"
    },
    vehicleType: {
      name: "VehicleTypeController",
      path: "../controllers/vehicleTypeController"
    }
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    driverType: {
      name: "DriverTypeRepo",
      path: "../repos/driverTypeRepo"
    },
    vehicleType: {
      name: "VehicleTypeRepo",
      path: "../repos/vehicleTypeRepo"
    }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    driverType: {
      name: "DriverTypeService",
      path: "../services/driverTypeService"
    },
    vehicleType: {
      name: "VehicleTypeService",
      path: "../services/vehicleTypeService"
    }
  },
};
