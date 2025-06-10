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
exports.StatusMapEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const statusList_entity_1 = require("./statusList.entity");
const lead_entity_1 = require("./lead.entity");
const affiliate_entity_1 = require("./affiliate.entity");
let StatusMapEntity = class StatusMapEntity {
};
exports.StatusMapEntity = StatusMapEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], StatusMapEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], StatusMapEntity.prototype, "status_text", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusMapType,
        default: enums_1.StatusMapType.STATUS,
    }),
    __metadata("design:type", String)
], StatusMapEntity.prototype, "target_type", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true }),
    __metadata("design:type", Boolean)
], StatusMapEntity.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => statusList_entity_1.StatusListEntity, (status) => status.status_map, { nullable: true, cascade: false, onDelete: 'NO ACTION' }),
    __metadata("design:type", statusList_entity_1.StatusListEntity)
], StatusMapEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => lead_entity_1.LeadEntity, (lead) => lead.statusMap, { nullable: true, cascade: false, onDelete: 'NO ACTION' }),
    __metadata("design:type", lead_entity_1.LeadEntity)
], StatusMapEntity.prototype, "lead", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => affiliate_entity_1.AffiliateEntity, (affiliate) => affiliate.statusMap, { nullable: true, cascade: false, onDelete: 'NO ACTION' }),
    __metadata("design:type", affiliate_entity_1.AffiliateEntity)
], StatusMapEntity.prototype, "affiliate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StatusMapEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StatusMapEntity.prototype, "updatedAt", void 0);
exports.StatusMapEntity = StatusMapEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "status_map" })
], StatusMapEntity);
