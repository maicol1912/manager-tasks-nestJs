import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserToProjectDto } from './dto/user-project.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicAccess } from '../auth/decorators/public.decorators';

@ApiTags('user')
@Controller('user')
//debemos definir el UseGuards para permitir que los accesos sean definidos por los guards
//debemos enviarle como parametro el guard que definimos para el control de accesos
//cada endpoint que definimos aca validara la existencia de token, en el unico caso que no lo valida es en el 
//public access ya que este devuelve siempre un true
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get('all')
  public async findAll() {
    return await this.userService.findAll();
  }

  //este decorador lo definimos anualmente con un true que significa que no eejcuta el guard para validar el acceso
  //lo deja pasar sin necesidad de validar accesos
  @PublicAccess()
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post('add-to-project')
  public async userInProject(@Body() body: UserToProjectDto) {
    return await this.userService.relationToProject(body);
  }


  @Patch('edit/:id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  public async remove(@Param('id') id: string) {
    return await this.userService.deletUser(id);
  }
}
