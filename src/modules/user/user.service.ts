import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
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
      return await this.userRepository.save(createUserDto)

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      const users:UserEntity[] = await this.userRepository.find()
      if(users.length===0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se encontro resultado'
        })
      } 
      return users;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async findOne(id: string): Promise<UserEntity> {
    //return await this.userRepository.findOne({where:{id:id}})
    try {
      const user:UserEntity = await this.userRepository.createQueryBuilder('user')
      .where({ id })
      //se relaciona con el atributo projectsIncludes que ya despues accede a la tabla de relaciones y
      //accede a la tabla de project para traer los datos 
      //el user que se coloca en createQueryBuilder es como el nombre de la tabla
      .leftJoinAndSelect('user.projectsIncludes','projectsIncludes')
      .leftJoinAndSelect('projectsIncludes.project','project')
      .getOne()
      if(!user){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se encontro resultado'
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
          type:'BAD_REQUEST',
          message:'No se pudo actualizar'
        })  
      }
      return user

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async deletUser(id: string): Promise<DeleteResult> {
    try {
      const user:DeleteResult = await this.userRepository.delete(id)
      if(user.affected === 0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se pudo borrar'
        })  
      }
      return user
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
    
  }

  public async relationToProject(body:UserToProjectDto):Promise<UserProjectsEntity>{
    try {
      return await this.userProjectRepository.save(body)
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }
}
