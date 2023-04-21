import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt"
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectsEntity } from './entities/usersProjects.entity';
import { UserToProjectDto } from './dto/user-project.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UserProjectsEntity) private readonly userProjectRepository: Repository<UserProjectsEntity>
  ) { }

  public async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    try {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        +process.env.HASH_SALT
      )
      return await this.userRepository.save(createUserDto)

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository.find()
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }
      return users;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async findOne(id: string): Promise<UserEntity> {
    try {
      const user: UserEntity = await this.userRepository.createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.projectsIncludes', 'projectsIncludes')
        .leftJoinAndSelect('projectsIncludes.project', 'project')
        .getOne()
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontro resultado'
        })
      }
      return user;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, updateUserDto)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar'
        })
      }
      return user

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async deletUser(id: string): Promise<DeleteResult> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id)
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo borrar'
        })
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async relationToProject(body: UserToProjectDto): Promise<UserProjectsEntity> {
    try {
      return await this.userProjectRepository.save(body)
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async findBy({key,value}:{key:keyof CreateUserDto,value:any}){
    try {
      const user:UserEntity = await this.userRepository.createQueryBuilder(
        'user',
      ).addSelect('user.password').where({[key]:value}).getOne()

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }
}
