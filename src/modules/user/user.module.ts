import { UserEntity } from './entities/user.entity';
import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProjectsEntity } from './entities/usersProjects.entity';

@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity,UserProjectsEntity]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService,TypeOrmModule]
})
export class UserModule {}
