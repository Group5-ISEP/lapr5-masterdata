import { Router } from 'express';
//import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import path from './routes/pathRoute';
import driverTypes from './routes/driverTypeRoute';
import vehicleTypes from './routes/vehicleTypeRoute';
import node from './routes/nodeRoute';
import line from './routes/lineRoute';
import upload from './routes/importRoute';

export default () => {
	const app = Router();

	//auth(app);
	user(app);
	role(app);
	path(app);
	driverTypes(app);
	vehicleTypes(app)
	node(app);
	line(app);
	upload(app);
	return app
}