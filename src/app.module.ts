import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [TaskModule, UserModule],
  controllers: [],
  providers: [...databaseProviders],
  exports:[...databaseProviders]
})
export class AppModule {}
