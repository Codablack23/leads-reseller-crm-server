"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AffiliateEntity = void 0;
const typeorm_1 = require("typeorm");
const apiKey_entity_1 = require("./apiKey.entity");
const user_entity_1 = require("./user.entity");
const traffic_entity_1 = require("./traffic.entity");
const statusMap_entity_1 = require("./statusMap.entity");
let AffiliateEntity = class AffiliateEntity {
};
exports.AffiliateEntity = AffiliateEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], AffiliateEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { unique: true }),
    __metadata("design:type", String)
], AffiliateEntity.prototype, "affiliateId", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], AffiliateEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], AffiliateEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => apiKey_entity_1.APIKeyEntity, (apiKey) => apiKey.affiliate),
    __metadata("design:type", Array)
], AffiliateEntity.prototype, "apiKey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => traffic_entity_1.TrafficEntity, (traffic) => traffic.affiliate, { nullable: true }),
    __metadata("design:type", Array)
], AffiliateEntity.prototype, "traffic", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => statusMap_entity_1.StatusMapEntity, (statusMap) => statusMap.affiliate, { nullable: true }),
    __metadata("design:type", Array)
], AffiliateEntity.prototype, "statusMap", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.affiliate, { nullable: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], AffiliateEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AffiliateEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AffiliateEntity.prototype, "updatedAt", void 0);
exports.AffiliateEntity = AffiliateEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "affiliates" })
], AffiliateEntity);
