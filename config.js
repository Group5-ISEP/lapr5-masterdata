//import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}*/

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
    databaseURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/test',
    //mongodb+srv://admin:admin@clustergrupo5.6nnre.mongodb.net/masterdata?authSource=admin&replicaSet=atlas-113yi8-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true

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
    path: {
      name: "PathController",
      path: "../controllers/pathController"
    },
    vehicleType: {
      name: "VehicleTypeController",
      path: "../controllers/vehicleTypeController"
    },
    node: {
      name: "NodeController",
      path: "../controllers/nodeController"
    },
    line: {
      name: "LineController",
      path: "../controllers/lineController"
      },
    user: {
        name: "UserController",
        path: "../controllers/userController"
      },
      import: {
          name: "ImportController",
          path: "../controllers/importController"
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
    path: {
      name: "PathRepo",
      path: "../repos/pathRepo"
    },
    driverType: {
      name: "DriverTypeRepo",
      path: "../repos/driverTypeRepo"
    },
    vehicleType: {
      name: "VehicleTypeRepo",
      path: "../repos/vehicleTypeRepo"
    },
    node: {
      name: "NodeRepo",
      path: "../repos/nodeRepo"
    },
    line: {
      name: "LineRepo",
      path: "../repos/lineRepo"
      },
      user: {
          name: "UserRepo",
          path: "../repos/userRepo"
      }
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    path: {
      name: "PathServices",
      path: "../services/pathService"
    },
    driverType: {
      name: "DriverTypeService",
      path: "../services/driverTypeService"
    },
    vehicleType: {
      name: "VehicleTypeService",
      path: "../services/vehicleTypeService"
    },
    node: {
      name: "NodeService",
      path: "../services/nodeService"
    },
    line: {
      name: "LineService",
      path: "../services/lineService"
      },
      user: {
          name: "UserService",
          path: "../services/userService"
      },
      import: {
          name: "ImportService",
          path: "../services/importService"
      }
  },
};
