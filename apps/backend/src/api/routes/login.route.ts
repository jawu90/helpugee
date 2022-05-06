
/**
 * Configure and initiate the server.
 * @file api/routes/user.route.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires express
 * @requires models/user.model
 * @requires service/user.service
 * @requires repositories/user.repository
 */

// import npm-packages
import express, { Request, Response, NextFunction } from 'express';

// import data models, interfaces and controllers
import userService from '../../services/user.service';
import authenticationService from "../../services/authentication.service";
import TranslatableError from "../../types/translatable.error";

// create router object
const router = express.Router();

/**
 * @api {post} /login login
 * @apiName postlogin
 * @apiVersion 0.0.0
 * @apiGroup Login
 * 
 * @apiBody {String} username username
 * @apiBody {String} password password
 * 
 * @apiSuccess (200) {Object} response response
 * @apiSuccess (200) {String} response.jwt JWT token
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const username = userService.getUsernameFromAny(req.body);
        const password = userService.getPasswordFromAny(req.body);
        const jwt = await authenticationService.login(username, password);
        res.json({jwt});
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

export default router;
