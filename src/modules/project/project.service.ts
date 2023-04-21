import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { UserProjectsEntity } from '../user/entities/usersProjects.entity';
import { ACCESS_LEVEL } from 'src/constants/roles';
import { UserService } from '../user/user.service';
import { HttpCustomService } from '../providers/providers.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity) private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserProjectsEntity)private readonly userProjectRepository: Repository<UserProjectsEntity>,
    private readonly userService:UserService,
    private readonly httpService: HttpCustomService
    ) { }

  public async createProject(createProjectDto: CreateProjectDto,userId:string): Promise<any> {
    try {
      const user = await this.userService.findOne(userId)
      const project = await this.projectRepository.save(createProjectDto)
      return await this.userProjectRepository.save({
        accessLevel:ACCESS_LEVEL.OWNER,
        user:user,
        project
      })

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
  }

  public async findAll(): Promise<ProjectEntity[]> {
    try {
      const projects:ProjectEntity[] = await this.projectRepository.find()
      if(projects.length===0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se encontro resultado'
        })
      } 
      return projects;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async findOne(id: string): Promise<ProjectEntity> {
    try {
      const project:ProjectEntity = await this.projectRepository.createQueryBuilder('project')
      .where({ id })
      .leftJoinAndSelect('project.usersIncludes','usersIncludes')
      .leftJoinAndSelect('usersIncludes.user','user')
      .getOne()
      if(!project){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se encontro resultado'
        })
      }
      return project;

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<UpdateResult> {
    try {
      const project: UpdateResult = await this.projectRepository.update(id, updateProjectDto)
      if (project.affected === 0) {
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se pudo actualizar'
        })  
      }
      return project

    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }

  }

  public async deletProject(id: string): Promise<DeleteResult> {
    try {
      const project:DeleteResult = await this.projectRepository.delete(id)
      if(project.affected === 0){
        throw new ErrorManager({
          type:'BAD_REQUEST',
          message:'No se pudo borrar'
        })  
      }
      return project
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message)
    }
    
  }

  public async listApi(){
    return this.httpService.apiFindAll()
  }
}
