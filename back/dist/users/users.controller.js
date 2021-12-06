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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const common_2 = require("@nestjs/common");
const public_decorator_1 = require("../auth/utils/public.decorator");
const update_userName_dto_1 = require("./dto/update-userName.dto");
const achievements_1 = require("../achievements/achievements");
const update_user_dto_1 = require("../chat/channel/dto/update-user.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async addUser(res, createUserDto) {
        if (await this.usersService.userExists(createUserDto.id)) {
            return res.status(common_2.HttpStatus.CONFLICT).json({
                message: "User already exists"
            });
        }
        if (await this.usersService.userNameAlreadyExists(createUserDto.userName)) {
            return res.status(common_2.HttpStatus.CONFLICT).json({
                message: "User Name is already taken"
            });
        }
        const user = await this.usersService.create(createUserDto);
        return res.status(common_2.HttpStatus.CREATED).json({
            message: "User has been created successfully",
            user
        });
    }
    async updateUserName(res, id, updateUserNameDto) {
        if (await this.usersService.userNameAlreadyExists(updateUserNameDto.newUserName)) {
            return res.status(common_2.HttpStatus.CONFLICT).json({
                message: "User Name is already taken"
            });
        }
        const user = await this.usersService.updateUserName(id, updateUserNameDto);
        return res.status(common_2.HttpStatus.OK).json({
            message: "User Name has been successfully updated",
            user
        });
    }
    async uploadAvatar(res, id, file) {
        const user = await this.usersService.setAvatar(id, `${file.filename}`);
        return res.status(common_2.HttpStatus.OK).json({
            message: "Avatar has been successfully uploaded",
            user
        });
    }
    async updateFriend(res, id, updateUserDto) {
        if (updateUserDto.toAdd) {
            const message = await this.usersService.addAsFriend(id, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: message
            });
        }
        else {
            const message = await this.usersService.removeFromFriends(id, updateUserDto.user);
            return res.status(common_2.HttpStatus.OK).json({
                message: message
            });
        }
    }
    async updateBlock(res, id, updateUserDto) {
        let message;
        if (updateUserDto.toAdd) {
            message = await this.usersService.addAsBlocked(id, updateUserDto.user);
        }
        else {
            message = await this.usersService.removeFromBlocked(id, updateUserDto.user);
        }
        return res.status(common_2.HttpStatus.OK).json({
            message: message
        });
    }
    async findAll() {
        return await this.usersService.findAll();
    }
    async findOne(id) {
        return await this.usersService.findOne(id);
    }
    getAchievements(id) {
        return this.usersService.getAchievements(id);
    }
    async getFriends(id) {
        return await this.usersService.getFriends(id);
    }
    async getBlocked(id) {
        return await this.usersService.getBlocked(id);
    }
    async getUsersexceptBlocked(id) {
        return await this.usersService.getUsersexceptBlocked(id);
    }
    async logout(id) {
        return await this.usersService.updateLogState(id, false);
    }
    serveAvatar(id, res) {
        const getAvatarFile = async () => {
            const avatarPath = await this.usersService.getAvatar(id);
            if (avatarPath)
                return res.sendFile(avatarPath, { root: 'avatars' });
            else
                throw new common_1.NotFoundException;
        };
        return getAvatarFile();
    }
    serveAchievImage(class_name, res) {
        return res.sendFile(`${class_name}_icon.png`, { root: "src/achievements/images" });
    }
    async remove(id) {
        return await this.usersService.remove(id);
    }
    async removeAvatar(id) {
        return await this.usersService.removeAvatar(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_userName_dto_1.UpdateUserNameDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateUserName", null);
__decorate([
    (0, common_1.Post)(':id/avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: './avatars',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadAvatar", null);
__decorate([
    (0, common_1.Post)(':id/friends'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateFriend", null);
__decorate([
    (0, common_1.Post)(':id/block'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateBlock", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/achievements'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAchievements", null);
__decorate([
    (0, common_1.Get)(':id/friends'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getFriends", null);
__decorate([
    (0, common_1.Get)(':id/blocked'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getBlocked", null);
__decorate([
    (0, common_1.Get)(':id/non-block-users'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUsersexceptBlocked", null);
__decorate([
    (0, common_1.Get)('logout/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':id/avatar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "serveAvatar", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('achievements/:class'),
    __param(0, (0, common_1.Param)('class')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "serveAchievImage", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Delete)(':id/avatar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "removeAvatar", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map