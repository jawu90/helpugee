/**
 * Route for features.
 * @file api/routes/feature.route.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires express
 * @requires models/feature.model
 * @requires models/role.model
 * @requires service/feature.service
 * @requires service/utils.service
 * @requires service/authentication.service
 * @requires repositories/feature.repository
 */

// import npm-packages
import express, {NextFunction, Request, Response} from 'express';

// import data models, interfaces and services
import Feature from './../../../models/feature.model';
import featureService from '../../../services/feature.service';
import featureRepository from '../../../repositories/feature.repository';
import authenticationService from "../../../services/authentication.service";
import utilsService from "../../../services/utils.service";
import TranslatableError from "../../../types/translatable.error";

// create router object
const router = express.Router();

// register middleware for route protection
//router.use('/', authenticationService.verifyAccess);

/**
 * @api {get} /feature get features
 * @apiName getusers
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiSuccess {Object[]} feature list of features
 * @apiUse FeatureInResponse
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const features = await featureRepository.findAll();
        res.status(200).send(features);
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {get} /feature/:id get feature by id
 * @apiName getfeature
 * @apiVersion 0.0.0
 * @apiGroup Feature
 * @apiUse General
 * 
 * @apiParam {Number} id feature id
 * 
 * @apiSuccess {Object} feature feature by id
 * @apiUse FeatureInResponse
 */
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = utilsService.getIdFromAny(req.params.id);
        const feature = await featureRepository.findById(id);
        res.status(200).send(feature);
    } catch(err) {
        res.status(500).send({
            error_code: 500,
            error_msg: err.message,
            translatable: (err instanceof TranslatableError) ? err.translatable : 'error.unknown_error',
        });
    }
});

/**
 * @api {post} /feature post new user
 * @apiName postfeature
 * @apiVersion 0.0.0
 * @apiGroup User
 * @apiUse General
 * 
 * @apiUse FeatureInRequest
 * 
 * @apiSuccess {String} msg "OK"
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const feature: Feature = featureService.getInstanceFromAny(req.body);
        await featureRepository.add(feature);
        res.status(200).send({
            msg: "OK",
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
 * @api {put} /feature edit feature
 * @apiName putfeature
 * @apiVersion 0.0.0
 * @apiGroup Feature
 * @apiUse General
 * 
 * @apiUse FeatureInRequest
 * 
 * @apiUse Success
 */
 router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const feature = featureService.getInstanceFromAny(req.body);
        await featureRepository.edit(feature);
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
 * @api {delete} /feature delete feature
 * @apiName deletefeature
 * @apiVersion 0.0.0
 * @apiGroup Feature
 * @apiUse General
 * 
 * @apiParam {Number} id feature id
 * 
 * @apiUse Success
 */
 router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = utilsService.getIdFromAny(req.params.id);
        await featureRepository.remove(id);
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
