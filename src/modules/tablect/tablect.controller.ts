import { Controller, Post, Body, Get } from '@nestjs/common';
import { TablectService } from './tablect.service';
import { CreateTablectDto } from './dto/create-tablect.dto';

@Controller('tablect')
export class TablectController {
  constructor(private readonly tablectService: TablectService) {}

  @Post()
  async create(@Body() createTablectDto: CreateTablectDto) {
    // console.log(createTablectDto);
    const response = await this.tablectService.createTablect(createTablectDto);
    console.log(response);
    return 'Add successfull';
  }

  @Get()
  async getTablect() {
    const response = await this.tablectService.getTablect();
    return {
      data: response,
    };
  }
}
