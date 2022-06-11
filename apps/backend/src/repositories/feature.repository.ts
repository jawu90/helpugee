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
import FeatureDto from "../models/feature.dto";
import Category from "../models/category.enum";

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
    public async findAll(category: Category = Category.ALL): Promise<{features: FeatureDto[], categories: string[]}> {
        const features = await this.database.selectAllFeatures(category);
        const categories = new Set<string>();
        return {
            features: features ? features.map((feature: any) => {
                this.checkDatatype(feature);
                categories.add(feature.category);
                return new FeatureDto(
                    feature.id, feature.label, feature.category, JSON.parse(feature.geom), feature.address, feature.serviceProduct, feature.openingHours,
                    feature.weSpeak, feature.specificOfferForRefugees, feature.contactInformation,
                    feature.fromDate, feature.untilDate, feature.other, feature.createdAt, feature.createdBy,
                    feature.modifiedAt, feature.modifiedBy, feature.isDeleted
                );
            }): [],
            categories: [...categories]
        };
    }

    /**
     * @description Retrieve all feature categories from database.
     * @returns A array of all feature categories.
     * @async
     */
    public async findAllCategories(): Promise<{categories: string[]}> {
        const categories = await this.database.selectAllFeatureCategories();
        return {
            categories: categories ? categories.map( c => c.category ) : []
        };
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
            feature.id, feature.label, feature.category, feature.geom, feature.address, feature.serviceProduct, feature. openingHours,
            feature.weSpeak, feature.specificOfferForRefugees, feature.contactInformation,
            feature.fromDate, feature.untilDate, feature.other, feature.createdAt, feature.createdBy,
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
            feature.label, feature.category, feature.geom, feature.address, feature.serviceProduct, feature.openingHours,
            feature.weSpeak, feature.specificOfferForRefugees, feature.contactInformation,
            feature.fromDate, feature.untilDate, feature.other
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
            newFeature.id, newFeature.label, newFeature.category, newFeature.geom, newFeature.address, newFeature.serviceProduct, newFeature.openingHours,
            newFeature.weSpeak, newFeature.specificOfferForRefugees, newFeature.contactInformation,
            newFeature.fromDate, newFeature.untilDate, newFeature.other
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
