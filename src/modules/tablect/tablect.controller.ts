import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  BadRequestException,
  Query,
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
  async getTablect(
    @Query('date_from') date_from: string,
    @Query('date_to') date_to: string,
    @Query('season') season: string,
    @Query('stage') stage: string,
    @Query('area') area: string,
    @Query('article') article: string,
  ) {

    const response = await this.tablectService.getTablect(
      date_from,
      date_to,
      season,
      stage,
      area,
      article,
    );
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
