import path from 'path';

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PositionHistoryModule } from './position-history/position-history.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: path.join(__dirname, 'database', 'mysqlitedatabase.db'),
      //storage: 'mysqlitedatabase.db,
      autoLoadModels: true, //autoLoadModels If true, models will be loaded automatically (default: false)
      synchronize: true, //If true, automatically loaded models will be synchronized (default: true)
      models: [], // We will be populating this field once we define User resource
    }),
    PositionHistoryModule,
  ],
})
export class AppModule {}
