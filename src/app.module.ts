import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { databaseProviders } from './database/database.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    TaskModule,
    UserModule,
    
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports:[...databaseProviders]
})
export class AppModule {}
