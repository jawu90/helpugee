/**
 * Service to handle feature business logic.
 * @file services/feature.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires bcrypt
 * @requires models/feature.model
 * @requires models/feature.interface
 */

// import data models and controller instances
import Feature from '../models/feature.model';
import IFeature from '../models/feature.interface';
import TranslatableError from "../types/translatable.error";


/**
 * @classdesc Class to handle feature business logic.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class FeatureService {

    /**
     * @description Default constructor.
     * @param featureService Feature service instance.
     */
    public constructor() {
        // pass
    }

    /**
     * @description Checks whether any object is a feature interface.
     * @param obj Any object
     * @returns Checks if obj is a valid user interface.
     */
    public isInterface(obj: any): obj is IFeature {
        return typeof obj.id === "number"
            && typeof obj.isDeleted === "boolean";
    }

    /**
     * @description Converts a feature interface into a feature object.
     * @param user A feature interface.
     */
    public getInstanceFromInterface(feature: IFeature): IFeature {
        return new Feature(
            feature.id, feature.geom, feature.address, feature.service_product, feature. opening_hours,
            feature.we_speak, feature.specific_offer_for_refugees, feature.contact_information,
            feature.from_date, feature.until_date, feature.other, feature.createdAt, feature.createdBy,
            feature.modifiedAt, feature.modifiedBy, feature.isDeleted
        );
    }

    /**
     * @description Converts any object into a feature object.
     * @param obj Object of any type.
     * @returns Feature created from any object.
     * @throws Will throw an error if obj is not a valid feature interface.
     */
    public getInstanceFromAny(obj: any): IFeature {
        if (!this.isInterface(obj)) {
            throw new TranslatableError('error.service.feature.is_not_valid');
        }
        return this.getInstanceFromInterface(obj as IFeature);
    }

}

// create feature service instance
const featureService: FeatureService = new FeatureService();

// export feature service instance
export default featureService;