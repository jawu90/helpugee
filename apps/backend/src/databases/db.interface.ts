/**
 * Interface to handle database requests.
 * @file databases/db.interface.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

/**
 * Interface to handle database requests.
 * @interface IDatabase
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default interface IDatabase {
    selectAllUsers(): Promise<any[]>;
    selectUserById(id: number): Promise<any>;
    selectUserByUsername(username: string): Promise<any>;
    insertUser(username: string, password: string, forename: string, surname: string, email: string): void;
    updateUser(id: number, username: string, password: string, forename: string, surname: string, email: string, isActive: boolean): void;
    deleteUser(id: number): void;

    selectAllFeatures(): Promise<any[]>;
    selectFeatureById(id: number): Promise<any>;
    insertFeature(label: string, category: string, geom: {type: "POINT", coordinates: [number, number]}, address: string, service_product: string, opening_hours: string,
                we_speak: string, specific_offer_for_refugees: string, contact_information: string, from_date: Date, until_date: Date, other: string): void;
    updateFeature(id: number, label: string, category: string, geom: {type: "POINT", coordinates: [number, number]}, address: string, service_product: string, opening_hours: string,
                we_speak: string, specific_offer_for_refugees: string, contact_information: string, from_date: Date, until_date: Date, other: string): void;
    deleteFeature(id: number): void;
}