import { Router } from 'express';
//import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import path from './routes/pathRoute';
import driverTypes from './routes/driverTypeRoute';
import node from './routes/nodeRoute';

export default () => {
	const app = Router();

	//auth(app);
	user(app);
	role(app);
	path(app);
	driverTypes(app);
	node(app);
	return app
}