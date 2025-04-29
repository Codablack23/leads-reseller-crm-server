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
    (0, typeorm_1.Column)("text", { default: "RECEIVED" }),
    __metadata("design:type", String)
], LeadEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], LeadEntity.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { default: "PENDING", }),
    __metadata("design:type", String)
], LeadEntity.prototype, "receiver_status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => traffic_entity_1.TrafficEntity, (traffic) => traffic.lead),
    __metadata("design:type", traffic_entity_1.TrafficEntity)
], LeadEntity.prototype, "traffic", void 0);
exports.LeadEntity = LeadEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "leads" })
], LeadEntity);
