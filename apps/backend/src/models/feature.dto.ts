/**
 * Model to handle feature requests.
 * @file models/feature.dto.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

/**
 * @classdesc Class to handle feature requests.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default class FeatureDto {

    readonly id: number;
    public label: string;
    public category: string;
    public geom: {
        type: "POINT",
        coordinates: [number, number]
    };
    public data: {
        address: string;
        serviceProduct: string;
        openingHours: string;
        weSpeak: string;
        specificOfferForRefugees: string;
        contactInformation: string;
        fromDate: Date | null;
        untilDate: Date | null;
        other: string;
    };
    readonly baseProperties: {
        createdAt: Date;
        createdBy: string;
        modifiedAt: Date | null;
        modifiedBy: string | null;
        isDeleted: boolean;
    }

    /**
     * @description Default constructor.
     */
    public constructor(
        id: number, label: string, category: string,
        geom: { type: "POINT", coordinates: [number, number] },
        address: string, serviceProduct: string, openingHours: string, weSpeak: string, specificOfferForRefugees: string, contactInformation: string, fromDate: Date | null, untilDate: Date | null, other: string,
        createdAt: Date, createdBy: string, modifiedAt: Date | null, modifiedBy: string, isDeleted: boolean,
    ) {
        this.id = id;
        this.label = label;
        this.category = category;
        this.geom = geom;
        this.data = {
            address,
            serviceProduct,
            openingHours,
            weSpeak,
            specificOfferForRefugees,
            contactInformation,
            fromDate,
            untilDate,
            other
        };
        this.baseProperties = {
            createdAt,
            createdBy,
            modifiedAt,
            modifiedBy,
            isDeleted
        };
    }

}