/* eslint-disable*/
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmissionItemsService } from './submission-items.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('submission-items')
@ApiTags('Submission Items - Controller')
export class SubmissionItemsController {
  constructor(private readonly submissionItemsService: SubmissionItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all submission items' })
  @ApiResponse({status: 200, description: 'All submission items', type: [Object]})
  findAll() {
    return this.submissionItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission item by ID' })
  @ApiResponse({status: 200, description: 'A submission item', type: Object})
  findOne(@Param('id') id: string) {
    return this.submissionItemsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission item by ID' })
  @ApiResponse({status: 200, description: 'The submission item was deleted', type: Object})
  remove(@Param('id') id: string) {
    return this.submissionItemsService.remove(id);
  }
}
