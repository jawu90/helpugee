/**
 * Model to handle feature data.
 * @file models/feature.model.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

// import data interface
import IFeature from '../models/feature.interface';

/** 
 * @classdesc Class to handle feature data.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default class Feature implements IFeature {

    /** 
     * @description Default constructor.
     */
    public constructor(
        readonly id: number,
        public label: string,
        public category: string,
        public geom: {type: "POINT", coordinates: [number, number]},
        public address: string, 
        public serviceProduct: string,
        public openingHours: string,
        public weSpeak: string,
        public specificOfferForRefugees: string,
        public contactInformation: string,
        public fromDate: Date | null,
        public untilDate: Date | null,
        public other: string,
        readonly createdAt: Date,
        readonly createdBy: string,
        readonly modifiedAt: Date,
        readonly modifiedBy: string,
        public isDeleted: boolean
    ) {}

}