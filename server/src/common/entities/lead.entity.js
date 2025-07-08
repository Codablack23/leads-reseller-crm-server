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
exports.LeadEntity = void 0;
const typeorm_1 = require("typeorm");
const traffic_entity_1 = require("./traffic.entity");
const statusMap_entity_1 = require("./statusMap.entity");
const enums_1 = require("../enums");
const affiliate_entity_1 = require("./affiliate.entity");
// import { LeadStatus } from "../../types/index";
let LeadEntity = class LeadEntity {
};
exports.LeadEntity = LeadEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], LeadEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], LeadEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], LeadEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], LeadEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("json", { nullable: true }),
    __metadata("design:type", Object)
], LeadEntity.prototype, "receiver_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: enums_1.LeadStatus }),
    __metadata("design:type", String)
], LeadEntity.prototype, "lead_status", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "funnel_name", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], LeadEntity.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "rejection_reason", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "call_status", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "ftd_status", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "ftd_date", void 0);
__decorate([
    (0, typeorm_1.Column)("longtext", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "ftd_description", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: false }),
    __metadata("design:type", Boolean)
], LeadEntity.prototype, "is_ftd", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => traffic_entity_1.TrafficEntity, (traffic) => traffic.lead, { cascade: false, onDelete: 'NO ACTION' }),
    __metadata("design:type", traffic_entity_1.TrafficEntity)
], LeadEntity.prototype, "traffic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => affiliate_entity_1.AffiliateEntity, (affiliate) => affiliate.lead, { cascade: false, onDelete: 'NO ACTION', nullable: true }),
    __metadata("design:type", affiliate_entity_1.AffiliateEntity)
], LeadEntity.prototype, "affiliate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => statusMap_entity_1.StatusMapEntity, (statusMap) => statusMap.lead, { cascade: false, nullable: true, onDelete: 'NO ACTION' }),
    __metadata("design:type", Array)
], LeadEntity.prototype, "statusMap", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], LeadEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], LeadEntity.prototype, "updatedAt", void 0);
exports.LeadEntity = LeadEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "leads" })
], LeadEntity);
