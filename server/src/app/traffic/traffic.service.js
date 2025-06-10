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
exports.TrafficService = void 0;
const core_db_1 = require("../../core/core.db");
const affiliate_entity_1 = require("../../common/entities/affiliate.entity");
const core_error_1 = require("../../core/core.error");
const traffic_entity_1 = require("../../common/entities/traffic.entity");
class TrafficService {
    constructor() {
        this.affiliateRepository = core_db_1.AppDataSource.getRepository(affiliate_entity_1.AffiliateEntity);
        this.trafficRepository = core_db_1.AppDataSource.getRepository(traffic_entity_1.TrafficEntity);
    }
    getTraffic(affiliateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const traffic = yield this.trafficRepository.find({
                relations: {
                    affiliate: true
                }
            });
            return traffic;
        });
    }
    getTrafficDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const traffic = yield this.trafficRepository.findOne({ where: { id } });
            if (!traffic)
                throw new core_error_1.NotFoundError("Traffic does not exist");
            return traffic;
        });
    }
    updateAffiliateTraffic(id, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryData = this.removeEmptyKeysFromObject(updatedData);
            const traffic = yield this.trafficRepository.update({ id }, Object.assign({}, queryData));
            return traffic;
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
exports.TrafficService = TrafficService;
