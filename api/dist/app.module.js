"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const post_module_1 = require("./post/post.module");
const category_module_1 = require("./category/category.module");
const typeorm_1 = require("@nestjs/typeorm");
const nest_access_control_1 = require("nest-access-control");
const user_roles_models_1 = require("./models/user-roles.models");
const auth_module_1 = require("./auth/auth.module");
const commander_module_1 = require("./commander/commander.module");
const category_entity_1 = require("./category/entities/category.entity");
const post_entity_1 = require("./post/entities/post.entity");
const user_entity_1 = require("./auth/entities/user.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_module_1.CategoryModule,
            post_module_1.PostModule,
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "",
                database: "blog",
                entities: [category_entity_1.Category, post_entity_1.Post, user_entity_1.User],
                autoLoadEntities: true,
                synchronize: true,
            }),
            nest_access_control_1.AccessControlModule.forRoles(user_roles_models_1.roles),
            commander_module_1.CommanderModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map