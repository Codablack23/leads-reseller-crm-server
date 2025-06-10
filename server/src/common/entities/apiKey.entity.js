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
exports.APIKeyEntity = void 0;
const typeorm_1 = require("typeorm");
const affiliate_entity_1 = require("./affiliate.entity");
const brand_entity_1 = require("./brand.entity");
let APIKeyEntity = class APIKeyEntity {
};
exports.APIKeyEntity = APIKeyEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], APIKeyEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { default: "ACTIVE" }),
    __metadata("design:type", String)
], APIKeyEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => affiliate_entity_1.AffiliateEntity, (affiliate) => affiliate.apiKey, { onDelete: "CASCADE" }),
    __metadata("design:type", affiliate_entity_1.AffiliateEntity)
], APIKeyEntity.prototype, "affiliate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.BrandEntity, (brand) => brand.apiKey, { onDelete: "CASCADE" }),
    __metadata("design:type", brand_entity_1.BrandEntity)
], APIKeyEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)("date"),
    __metadata("design:type", Date)
], APIKeyEntity.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], APIKeyEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], APIKeyEntity.prototype, "updatedAt", void 0);
exports.APIKeyEntity = APIKeyEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "api_keys" })
], APIKeyEntity);
