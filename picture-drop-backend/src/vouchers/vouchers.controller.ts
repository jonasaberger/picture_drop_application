/* eslint-disable */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VouchersService } from './vouchers.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Vouchers } from './entities/voucher.entity';


@Controller('vouchers')
@ApiTags('Vouchers - Controller')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vouchers' })
  @ApiResponse({status: 200, description: 'All vouchers', type: Vouchers, isArray: true})
  findAll() {
    return this.vouchersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a voucher by ID' })
  @ApiResponse({status: 200, description: 'A voucher', type: Vouchers})
  
  findOne(@Param('id') id: string) {
    return this.vouchersService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a voucher by ID' })
  @ApiResponse({status: 200, description: 'The voucher was deleted', type: Vouchers})
  remove(@Param('id') id: string) {
    return this.vouchersService.remove(id);
  }
}
