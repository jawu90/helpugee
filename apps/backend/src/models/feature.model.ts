/**
 * Model to handle user data.
 * @file models/user.model.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

// import data interface
import IFeature from '../models/feature.interface';

/** 
 * @classdesc Class to handle user data.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default class Feature implements IFeature {

    /** 
     * @description Default constructor.
     */
    public constructor(
        readonly id: number,
        public geom: {lat: number, lng: number},
        public address: string, 
        public service_product: string,
        public opening_hours: string,
        public we_speak: string,
        public specific_offer_for_refugees: string,
        public contact_information: string,
        public from_date: Date,
        public until_date: Date,
        public other: string,
        readonly createdAt: Date,
        readonly createdBy: string,
        readonly modifiedAt: Date,
        readonly modifiedBy: string,
        public isDeleted: boolean
    ) {}

}