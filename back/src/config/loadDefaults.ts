import { Connection, getRepository } from 'typeorm';
import setup from './defaultEntities';

export async function loadDefaults(dbConnection: Connection) : Promise<any> {
    Object.keys(setup).forEach(async entity => {
        const instances = setup[entity];
        try {
            for (let instance of instances)
            {
                const user = await getRepository(entity).findOne(instance);
                if (!user)
                    await dbConnection
                        .createQueryBuilder()
                        .insert()
                        .into(entity)
                        .values(instance)
                        .execute();
            }   
        } catch (e) { console.log("Error loading entities : " + e); }
    });
}
