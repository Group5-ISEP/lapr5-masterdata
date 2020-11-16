import { Router } from 'express';
//import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import driverTypes from './routes/driverTypeRoute';
import vehicleTypes from './routes/vehicleTypeRoute';
import node from './routes/nodeRoute';

export default () => {
	const app = Router();

	//auth(app);
	user(app);
	role(app);
	driverTypes(app);
	vehicleTypes(app)
	node(app);
	return app
}