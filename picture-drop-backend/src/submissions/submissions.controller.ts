import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Submission } from './entities/submission.entity';

@Controller('submissions')
@ApiTags('Submissions - Controller')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({status: 200, description: 'All submissions', type: Submission, isArray: true})
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by ID' })
  @ApiResponse({status: 200, description: 'A submission', type: Submission})
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission by ID' })
  @ApiResponse({status: 200, description: 'The submission was deleted', type: Submission})
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}

