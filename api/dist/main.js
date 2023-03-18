"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: `../${process.env.NODE_ENV}.env` });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("@nestjs/swagger");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    app.use((0, cookie_parser_1.default)());
    app.enableCors({
        origin: [
            "http://127.0.0.1:8080/",
            "http://localhost:4200",
            "http://localhost:4300",
            "https://cmsblog-frontend.azurewebsites.net",
        ],
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("CMS Blog")
        .setDescription("The blog API for professionals")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("/", app, document);
    await app.listen(5000);
}
bootstrap().then();
//# sourceMappingURL=main.js.map