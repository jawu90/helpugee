/**
 * Model to handle translatable errors.
 * @file types/translateable.error.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */

// import error messages
import errorsAsset from '../assets/errors.asset.json';

/**
 * @classdesc Class to handle translatable errors.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
export default class TranslatableError extends Error {

    /**
     * @description Default constructor.
     * @param _translateable Translateable string to identify error message.
     */
    constructor(private _translatable: string) {
        super('error.unknown');
        this.message = this.getTranslation(this._translatable.split('.'));
        Object.setPrototypeOf(this, TranslatableError.prototype);
    }

    /**
     * @description Getter for translatable property.
     * @returns Translatable error string
     */
    get translatable(): string {
        return this._translatable;
    }

    /**
     * @description Maps translatable error string to error message.
     * @returns Error message found in errors asset json file.
     */
    private getTranslation(keys: string[]): string {
        let error: any = errorsAsset;
        for (const key of keys) {
            if (error[key] === 'undefined') {
                break;
            }
            error = error[key];
        }
        if (typeof error !== 'string') {
            return 'error.unknown';
        }
        return error;
    }

}