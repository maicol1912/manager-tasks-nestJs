import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './database/data.source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UserModule,
    
  ],
})
export class AppModule {}
