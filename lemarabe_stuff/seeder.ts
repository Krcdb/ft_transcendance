import { Connection, getRepository } from 'typeorm';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export async function loadFixtures(name: string, dbConnection: Connection) : Promise<any> {
    let items: any[] = [];
    try {
        const file: any = yaml.load(fs.readFileSync(`./src/config/${name}.yml`, 'utf8'));
        items = file['fixtures'];
    } catch (e) {
        console.log('Fixture error: ', e);
    }
    if (!items) { return; }
    items.forEach(async (item: any) => {
        const entityName = Object.keys(item)[0];
        const data = item[entityName];
        try {
            const user = await getRepository(entityName).findOne(data);
            if (!user)
                await dbConnection
                    .createQueryBuilder()
                    .insert()
                    .into(entityName)
                    .values(data)
                    .execute();
        } catch (err) {
            console.log('Loading error: ', err);
        }
    });
}
