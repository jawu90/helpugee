"use strict";
/**
 * Model to handle translatable errors.
 * @file types/translateable.error.ts
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import error messages
const errors_asset_json_1 = __importDefault(require("../assets/errors.asset.json"));
/**
 * @classdesc Class to handle translatable errors.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class TranslatableError extends Error {
    /**
     * @description Default constructor.
     * @param _translateable Translateable string to identify error message.
     */
    constructor(_translatable) {
        super('error.unknown');
        this._translatable = _translatable;
        this.message = this.getTranslation(this._translatable.split('.'));
        Object.setPrototypeOf(this, TranslatableError.prototype);
    }
    /**
     * @description Getter for translatable property.
     * @returns Translatable error string
     */
    get translatable() {
        return this._translatable;
    }
    /**
     * @description Maps translatable error string to error message.
     * @returns Error message found in errors asset json file.
     */
    getTranslation(keys) {
        let error = errors_asset_json_1.default;
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
exports.default = TranslatableError;
//# sourceMappingURL=translatable.error.js.map