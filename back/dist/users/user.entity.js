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
exports.User = void 0;
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "matchHistory", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "nbVictories", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "nbLosses", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, default: 1000 }),
    __metadata("design:type", Number)
], User.prototype, "ladderLevel", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "achievements", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "friends", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "blockedUsers", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "channelsUserIsOwner", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "channelsUserIsAdmin", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "channelsUserIsIn", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "channelsUserIsBanned", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { nullable: true, array: true }),
    __metadata("design:type", Array)
], User.prototype, "channelsUserIsMuted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "twoFAuthSecret", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isTwoFAuthEnabled", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map