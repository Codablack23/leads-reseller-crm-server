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
exports.TrafficEntity = void 0;
const typeorm_1 = require("typeorm");
const lead_entity_1 = require("./lead.entity");
const brand_entity_1 = require("./brand.entity");
const affiliate_entity_1 = require("./affiliate.entity");
let TrafficEntity = class TrafficEntity {
};
exports.TrafficEntity = TrafficEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], TrafficEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { default: 1 }),
    __metadata("design:type", Number)
], TrafficEntity.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { default: 1 }),
    __metadata("design:type", Number)
], TrafficEntity.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint"),
    __metadata("design:type", Number)
], TrafficEntity.prototype, "dailyCap", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], TrafficEntity.prototype, "skipFallback", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], TrafficEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], TrafficEntity.prototype, "openingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("time"),
    __metadata("design:type", String)
], TrafficEntity.prototype, "closingTime", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { nullable: true }),
    __metadata("design:type", Array)
], TrafficEntity.prototype, "trafficDays", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => lead_entity_1.LeadEntity, (lead) => lead.traffic, {
        cascade: false,
        onDelete: 'NO ACTION'
    }),
    __metadata("design:type", Array)
], TrafficEntity.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_entity_1.BrandEntity, (brand) => brand.traffic, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", brand_entity_1.BrandEntity)
], TrafficEntity.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => affiliate_entity_1.AffiliateEntity, (affiliate) => affiliate.traffic, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", affiliate_entity_1.AffiliateEntity)
], TrafficEntity.prototype, "affiliate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TrafficEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TrafficEntity.prototype, "updatedAt", void 0);
exports.TrafficEntity = TrafficEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "traffic" })
], TrafficEntity);
