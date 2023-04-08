import { UserEntity } from './entities/user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectsEntity } from './entities/usersProjects.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity,UserProjectsEntity])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService,TypeOrmModule]
})
export class UserModule {}
