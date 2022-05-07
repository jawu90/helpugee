/**
 * Repository to handle feature database requests.
 * @file repository/feature.repository.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 * @requires models/feature.model
 * @requires models/feature.interface
 * @requires databases/postgresql.db
 * @requires databases/db.interface
 * @requires services/featureService
 * @requires types/tranlatable.error
 */

// import data models and controller instances
import IFeature from '../models/feature.interface';
import Feature from '../models/feature.model';
import IDatabase from '../databases/db.interface';
import postgresql from "../databases/postgresql.db";
import featureService from "../services/feature.service";
import TranslatableError from "../types/translatable.error";

/**
 * @classdesc Class to handle feature database requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export class FeatureRepository {

    /**
     * @description Default constructor.
     * @param database Database instance.
     */
    public constructor(private database: IDatabase) { }

    /**
     * @description Retrieve all features from database.
     * @returns A array of all feature instances.
     * @async
     */
    public async findAll(): Promise<IFeature[]> {
        const features = await this.database.selectAllFeatures();
        return features ? features.map((feature: any) => {
            this.checkDatatype(feature);
            return new Feature(
                feature.id, feature.geom, feature.address, feature.service_product, feature. opening_hours,
                feature.we_speak, feature.specific_offer_for_refugees, feature.contact_information,
                feature.from_date, feature.until_date, feature.other, feature.createdAt, feature.createdBy,
                feature.modifiedAt, feature.modifiedBy, feature.isDeleted
            );
        }) : [];
    }

    /**
     * @description Retrieve a feature from database by id.
     * @returns A single feature instances.
     * @async
     */
    public async findById(id: number): Promise<IFeature> {
        const feature = await this.database.selectFeatureById(id);
        this.checkDatatype(feature);
        return new Feature(
            feature.id, feature.geom, feature.address, feature.service_product, feature.opening_hours,
            feature.we_speak, feature.specific_offer_for_refugees, feature.contact_information,
            feature.from_date, feature.until_date, feature.other, feature.createdAt, feature.createdBy,
            feature.modifiedAt, feature.modifiedBy, feature.isDeleted
        );
    }

    /**
     * @description Add a single feature into the database.
     * @param feature A single feature.
     * @async
     */
    public async add(feature: IFeature): Promise<void> {
        const newFeature = Object.assign({}, feature);
        this.checkConstraints(newFeature);
        await this.database.insertFeature(
            feature.geom, feature.address, feature.service_product, feature.opening_hours,
            feature.we_speak, feature.specific_offer_for_refugees, feature.contact_information,
            feature.from_date, feature.until_date, feature.other
        );
    }

    /**
     * @description Edit a single feature from database.
     * @param feature A single feature.
     * @async
     */
    public async edit(feature: IFeature): Promise<void> {
        const newFeature = Object.assign({}, feature);
        const oldFeature = await this.database.selectFeatureById(feature.id);
        this.checkDatatype(feature);
        newFeature.isDeleted = oldFeature.isDeleted;
        this.checkConstraints(newFeature);
        await this.database.updateFeature(
            newFeature.id, newFeature.geom, newFeature.address, newFeature.service_product, newFeature.opening_hours,
            newFeature.we_speak, newFeature.specific_offer_for_refugees, newFeature.contact_information,
            newFeature.from_date, newFeature.until_date, newFeature.other
        );
    }

    /**
     * @description Mark a single feature from database as deleted.
     * @param id ID of a feature.
     * @async
     */
    public async remove(id: number): Promise<void> {
        const feature = await this.database.selectFeatureById(id);
        this.checkDatatype(feature);
        feature.isDeleted = true;
        await this.database.deleteFeature(
            feature.id
        );
    }

    /**
     * @description Check model constraints.
     * @param feature Feature whose constraints are checked.
     * @throws Will throw an error if the featurename or password is empty.
     */
    private checkConstraints(feature: IFeature): void {}

    /**
     * @description Check if datatype is feature interface.
     * @param obj Object that is checked to see if it is a feature interface.
     * @throws Will throw an error if obj is not a feature interface.
     */
    private checkDatatype(obj: any): void {
        if (!featureService.isInterface(obj)) {
            throw new TranslatableError('error.repository.feature.is_not_valid');
        }
    }

}

// create feature repository instance
const featureRepository: FeatureRepository = new FeatureRepository(postgresql);

// export feature repository instance
export default featureRepository;
