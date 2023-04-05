import { TaskModule } from './task/task.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
