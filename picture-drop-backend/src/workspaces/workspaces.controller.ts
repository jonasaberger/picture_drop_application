/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Delete } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {Workspaces} from './entities/workspaces.entity';

@Controller('workspaces')
@ApiTags('Workspaces - Controller')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workspaces' })
  @ApiResponse({status: 200, description: 'All workspaces', type: Workspaces, isArray: true})
  findAll() {
    return this.workspacesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workspace by ID' })
  @ApiResponse({status: 200, description: 'A workspace', type: Workspaces})
  findOne(@Param('id') id: string) {
    return this.workspacesService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workspace by ID' })
  @ApiResponse({status: 200, description: 'The workspace was deleted', type: Workspaces})
  remove(@Param('id') id: string) {
    return this.workspacesService.remove(+id);
  }
}
