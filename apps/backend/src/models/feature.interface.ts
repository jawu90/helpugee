/**
 * Interface to handle user data.
 * @file models/user.interface.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

import IBase from "./base.interface";

/**
 * Interface to handle user data.
 * @interface IUser
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default interface IFeature extends IBase {
    id: number,
    geom: {lat: number, lng: number},
    address: string, 
    service_product: string,
    opening_hours: string,
    we_speak: string,
    specific_offer_for_refugees: string,
    contact_information: string,
    from_date: Date | null,
    until_date: Date | null,
    other: string,
    isDeleted: boolean
 }