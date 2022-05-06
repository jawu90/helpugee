/**
 * Interface which represents basic data of every model.
 */
export default interface IBase {
    id: number;
    createdAt: Date;
    createdBy: string;
    modifiedAt: Date;
    modifiedBy: string;
    isDeleted: boolean;
}