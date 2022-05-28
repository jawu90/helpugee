/**
 * Interface to handle feature data.
 * @file models/feature.interface.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

import IBase from "./base.interface";

/**
 * Interface to handle feature data.
 * @interface IFEATURE
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default interface IFeature extends IBase {
    id: number,
    label: string,
    category: string,
    geom: {type: "POINT", coordinates: [number, number]},
    address: string, 
    serviceProduct: string,
    openingHours: string,
    weSpeak: string,
    specificOfferForRefugees: string,
    contactInformation: string,
    fromDate: Date | null,
    untilDate: Date | null,
    other: string,
    isDeleted: boolean
 }