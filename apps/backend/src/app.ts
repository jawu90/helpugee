/**
 * Configure and initiate the app.
 * @file app.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @module app
 * @requires express
 * @requires cors
 * @requires api/routes/user.route
 */
 
// import npm-packages
import express from 'express';
import cors from 'cors';
import httpContext from 'express-http-context';

// import utils
import winstonExpressLogger from './utils/logger.util';

// import routes
import loginRoute from './api/routes/login.route';
import userRoute from './api/routes/user.route';
import orderRoute from './api/routes/order.route';
import sectionRoute from './api/routes/section.route';
import vehicleRoute from './api/routes/vehicle.route';
import materialRoute from './api/routes/material.route';
import locationRoute from './api/routes/location.route';
import deliveryRoute from './api/routes/delivery.route';
import positionRoute from './api/routes/position.route';
import floodingRoute from './api/routes/flooding.route';
import dataPrivacyRoute from "./api/routes/data-privacy.route";
import kpiRoute from "./api/routes/kpi.route";

// create express app
const app: express.Express = express();

// use standard middleware for cors, url-parameter and json-body handling
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use standard middleware for logging
app.use(winstonExpressLogger);

// Use any third party middleware that does not need access to the context here, e.g.
app.use(httpContext.middleware);

// use api routes
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/section', sectionRoute);
app.use('/vehicle', vehicleRoute);
app.use('/material', materialRoute);
app.use('/location', locationRoute);
app.use('/delivery', deliveryRoute);
app.use('/position', positionRoute);
app.use('/flooding', floodingRoute);
app.use('/dataPrivacy', dataPrivacyRoute);
app.use('/kpi', kpiRoute);

// export express app
export default app;
