/**
 * Service to handle utils business logic.
 * @file services/utils.service.ts
 * @license MIT
 * @since 0.1.0
 * @author Florian Strohmeier
 * @requires types/translatable.error
 */

import TranslatableError from "../types/translatable.error";
import IVehicle from "../models/vehicle.interface";

/**
 * @classdesc Class to handle business logic that is used by different entities.
 */
class UtilsService {


    /**
     * @description Parse ID from URL parameters.
     * @param obj Object of any type.
     * @returns ID as number type.
     * @throws Will throw an error if id is not an integer.
     */
    public getIdFromAny(obj: any): number {
        const id = parseInt(obj);
        if (!Number.isInteger(id)) {
            throw new TranslatableError('error.service.util.id_is_not_url_parameter');
        }
        return id;
    }

    /**
     * Convert strings to dates of the base entity fields.
     * @param obj Any entity that implements base entity
     */
    public getBaseFromAny(obj: any) {
        if (typeof obj.createdAt === "string") {
            obj.createdAt = new Date(obj.createdAt);
        }
        if (typeof obj.modifiedAt === "string") {
            obj.modifiedAt = new Date(obj.modifiedAt);
        }
    }

    /**
     * Checks if a given obj fulfills the base entity requirements.
     * @param obj Any entity that implements base entity
     */
    public isBaseInterface(obj: any): boolean {
        return typeof obj.id === "number"
            && typeof obj.isDeleted === "boolean"
            && (obj.createdAt === null || (typeof obj.createdAt === "object" && obj.createdAt instanceof Date))
            && typeof obj.createdBy === "string"
            && (obj.modifiedAt === null || (typeof obj.modifiedAt === "object" && obj.modifiedAt instanceof Date))
            && typeof obj.modifiedBy === "string";
    }
}

const utilsService: UtilsService = new UtilsService();

export default utilsService;