import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { TablectService } from './tablect.service';
import { CreateTablectDto } from './dto/create-tablect.dto';

@Controller('tablect')
export class TablectController {
  constructor(private readonly tablectService: TablectService) {}

  @Post()
  async create(@Body() createTablectDto: CreateTablectDto[]): Promise<void> {
    return await this.tablectService.createTablect(createTablectDto);
  }

  @Get()
  async getTablect() {
    const response = await this.tablectService.getTablect();
    return {
      data: response,
    };
  }

  @Delete(':id')
  async deleteTablect(@Param('id') id: number) {
    try {
      await this.tablectService.deleteTablect(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
