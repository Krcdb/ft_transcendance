import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MatchModule } from './match/match.module';
import { ChannelModule } from './chat/channel/channel.module';
import { MessageModule } from './chat/message/message.module';
// import { loadFixtures } from './config/seeder';
import setup from './config/dbsetup';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
      }),
    }),
    UsersModule,
    AuthModule,
    MatchModule,
    ChannelModule, 
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
    Object.keys(setup).forEach(entity => {
      try {
        const vals = setup[entity];
        console.log("** Entity = " + entity);
        for (let i in vals)
        {
          console.log(" -> Loading " + entity + i + "...");
          this.connection
            .createQueryBuilder()
            .insert()
            .into(entity)
            .values(vals[i])
            .execute();
        }
      } catch (e) { console.log("Error loading entities : " + e); }
    });
    // console.log(this.connection);
    // async () => await loadFixtures('fixtures', this.connection);
  }
  // async getConnection() : Promise<Connection> {
  //   return this.connection;
  // }
}
