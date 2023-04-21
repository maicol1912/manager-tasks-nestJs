
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserToProjectDto } from './dto/user-project.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PublicAccess } from '../auth/decorators/public.decorators';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { AdminAccess } from '../auth/decorators/admin.decorators';

@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard,RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @PublicAccess()
  @Post('register')
  public async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @ApiHeader({
    name: 'auth_token'
  })
  @Get('all')
  public async findAll() {
    return await this.userService.findAll();
  }

  @ApiParam({
    name: 'id'
  })

  @PublicAccess()
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }


  @ApiHeader({
    name: 'auth_token'
  })
  @Post('add-to-project')
  public async userInProject(@Body() body: UserToProjectDto) {
    return await this.userService.relationToProject(body);
  }


  @ApiHeader({
    name: 'auth_token'
  })

  @ApiParam({
    name: 'userId'
  })
  @Patch('edit/:id')
  public async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @ApiHeader({
    name: 'auth_token'
  })

  @ApiParam({
    name: 'id'
  })
  @Delete('delete/:id')
  public async remove(@Param('id') id: string) {
    return await this.userService.deletUser(id);
  }
}
