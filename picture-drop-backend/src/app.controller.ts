/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get the status of the Picture-Drop backend' })
  @ApiResponse({status: 200, description: 'The status of the Picture-Drop backend', type: String})
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
