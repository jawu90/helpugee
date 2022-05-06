/**
 * Configure and initiate the server.
 * @file api/routes/user.route.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires express
 * @requires models/user.model
 * @requires models/role.model
 * @requires service/user.service
 * @requires service/utils.service
 * @requires service/authentication.service
 * @requires repositories/user.repository
 */

// import npm-packages
import express, {NextFunction, Request, Response} from 'express';

// import data models, interfaces and services
import User from './../../models/user.model';
import userService from '../../services/user.service';
import userRepository from '../../repositories/user.repository';
import authenticationService from "../../services/authentication.service";
import utilsService from "../../services/utils.service";
import TranslatableError from "../../types/translatable.error";

// create router object
const router = express.Router();

// register middleware for route protection
router.use('/', authenticationService.verifyAccess);

/**
 * @api {get} /user get users
 * @apiName getusers
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiSuccess {Object[]} user list of users
 * @apiUse UserInResponse
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userRepository.findAll();
        res.status(200).send(users);
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {get} /user/:id get user by id
 * @apiName getuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiParam {Number} id user id
 * 
 * @apiSuccess {Object} user user by id
 * @apiUse UserInResponse
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = utilsService.getIdFromAny(req.params.id);
        const user = await userRepository.findById(id);
        res.status(200).send(user);
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {post} /user post new user
 * @apiName postuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiUse UserInRequest
 * 
 * @apiSuccess {String} msg "OK"
 * @apiSuccess {Object} user user
 * @apiSuccess {String} user.username username
 * @apiSuccess {String} user.password generated password
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user: User = userService.getInstanceFromAny(req.body);
        const userWithNewPassword: User = userService.setNewPassword(user);
        const userWithHashedPw: User = await userService.hashPassword(userWithNewPassword);
        await userRepository.add(userWithHashedPw);
        res.status(200).send({
            msg: "OK",
            user: {
                username: userWithNewPassword.username,
                password: userWithNewPassword.password
            }
        });
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {put} /user edit user
 * @apiName putuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiUse UserInRequest
 * 
 * @apiUse Success
 */
 router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = userService.getInstanceFromAny(req.body);
        await userRepository.edit(user);
        if (user.password.length >= 6) {
            const userWithHashedPassword = await userService.hashPassword(user);
            await userRepository.changePassword(userWithHashedPassword);
        }
        res.send({ msg: "OK" });
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {delete} /user delete user
 * @apiName putuser
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiParam {Number} id user id
 * 
 * @apiUse Success
 */
 router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = utilsService.getIdFromAny(req.params.id);
        await userRepository.remove(id);
        res.status(200).send({ msg: "OK" });
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

export default router;
