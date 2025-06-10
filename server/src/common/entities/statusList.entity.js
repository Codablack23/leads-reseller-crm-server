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
exports.StatusListEntity = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../enums");
const statusMap_entity_1 = require("./statusMap.entity");
let StatusListEntity = class StatusListEntity {
};
exports.StatusListEntity = StatusListEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], StatusListEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], StatusListEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], StatusListEntity.prototype, "label_theme", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], StatusListEntity.prototype, "label_text_color", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.StatusType,
        default: enums_1.StatusType.GENERAL,
    }),
    __metadata("design:type", String)
], StatusListEntity.prototype, "status_type", void 0);
__decorate([
    (0, typeorm_1.Column)("boolean", { default: true }),
    __metadata("design:type", Boolean)
], StatusListEntity.prototype, "enabled", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => statusMap_entity_1.StatusMapEntity, (statusMap) => statusMap.status, {
        cascade: false,
        nullable: true,
        onDelete: 'NO ACTION',
    }),
    __metadata("design:type", Array)
], StatusListEntity.prototype, "status_map", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], StatusListEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], StatusListEntity.prototype, "updatedAt", void 0);
exports.StatusListEntity = StatusListEntity = __decorate([
    (0, typeorm_1.Entity)({ name: "status_list" })
], StatusListEntity);
