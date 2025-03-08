"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateService = void 0;
const core_db_1 = require("../../core/core.db");
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const core_error_1 = require("../../core/core.error");
class AffiliateService {
    constructor() {
        this.affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
    }
    getAffiliates() {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliates = yield this.affiliateRepository.find();
            return affiliates;
        });
    }
    getAffiliate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliate = yield this.affiliateRepository.findOne({ where: { id } });
            if (!affiliate)
                throw new core_error_1.NotFoundError("Affiliate does not exist");
            return affiliate;
        });
    }
    addAffliate(affiliateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const affiliateInstance = this.affiliateRepository.create(Object.assign({}, affiliateData));
            const newAffiliate = yield this.affiliateRepository.save(affiliateInstance);
            return Object.assign(Object.assign({}, affiliateData), { id: newAffiliate.id });
        });
    }
    deleteAffiliate(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.affiliateRepository.delete({ id });
            return { id };
        });
    }
    updateAffiliate(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryData = this.removeEmptyKeysFromObject(updatedData);
            yield this.affiliateRepository.update({ id }, Object.assign({}, queryData));
            return null;
        });
    }
    removeEmptyKeysFromObject(object) {
        const keys = Object.keys(object);
        const strippedObject = {};
        keys.map(key => {
            if (object[key]) {
                strippedObject[key] = object[key];
            }
        });
        return strippedObject;
    }
}
exports.AffiliateService = AffiliateService;
