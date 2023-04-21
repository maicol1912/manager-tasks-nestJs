import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './database/data.source';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal:true
    }),
    DevtoolsModule.register({
      http:process.env.NODE_ENV !== 'prod'
    }),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    UserModule,
    ProjectModule,
    AuthModule,
    TasksModule
  ],
})
export class AppModule {}
