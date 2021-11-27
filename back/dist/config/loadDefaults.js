"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDefaults = void 0;
const typeorm_1 = require("typeorm");
const defaultEntities_1 = require("./defaultEntities");
async function loadDefaults(dbConnection) {
    Object.keys(defaultEntities_1.default).forEach(async (entity) => {
        try {
            const instances = defaultEntities_1.default[entity];
            const alreadyInDB = await (0, typeorm_1.getRepository)(entity).find();
            if (alreadyInDB.length == 0) {
                for (let instance of instances)
                    await dbConnection
                        .createQueryBuilder()
                        .insert()
                        .into(entity)
                        .values(instance)
                        .execute();
            }
        }
        catch (e) {
            console.log("Error loading entities : " + e);
        }
    });
}
exports.loadDefaults = loadDefaults;
//# sourceMappingURL=loadDefaults.js.map