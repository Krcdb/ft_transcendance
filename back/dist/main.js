"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const loadDefaults_1 = require("./config/loadDefaults");
const typeorm_1 = require("typeorm");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors({});
    await app.listen(3000);
    await (0, loadDefaults_1.loadDefaults)((0, typeorm_1.getConnection)());
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map