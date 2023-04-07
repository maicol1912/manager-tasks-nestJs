import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserToProjectDto } from './dto/user-project.dto';

@ApiTags('user')
@Controller('user')
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
