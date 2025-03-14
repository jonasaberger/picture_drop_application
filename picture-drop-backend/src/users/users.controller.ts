/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('Users - Controller')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({status: 200, description: 'All users', type: User, isArray: true})
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({status: 200, description: 'A user', type: User})
  findOne(@Param('id') Id: string) {
    return this.usersService.findOne(Id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({status: 200, description: 'The user was deleted', type: User})
  remove(@Param('id') Id: string) {
    return this.usersService.remove(Id);
  }
}
