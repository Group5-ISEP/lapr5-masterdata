import { Router } from 'express';
//import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import path from './routes/pathRoute';
import driverTypes from './routes/driverTypeRoute';

export default () => {
	const app = Router();

	//auth(app);
	user(app);
	role(app);
	path(app);
	driverTypes(app);

	return app
}