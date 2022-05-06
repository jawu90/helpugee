/**
 * Configure and initiate the server.
 * @file main.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires utils/environment.utils
 * @requires http
 * @requires app
 */
 
// import npm-packages
import http from 'http';

// import environment instance
import environment from './utils/environment.util';

// import app object
import app from './app';

// create server
const server: http.Server = http.createServer(app);

// start server
server.listen(environment.port, environment.ip, () => {
    console.log(`Server is listening to ${environment.ip}:${environment.port}`);
});

