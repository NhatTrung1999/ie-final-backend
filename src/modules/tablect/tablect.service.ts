import { Injectable } from '@nestjs/common';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_TableCT } from './entities/tablect.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TablectService {
  constructor(
    @InjectRepository(IE_TableCT)
    private tablectRepository: Repository<IE_TableCT>,
  ) {}

  async createTablect(
    createTablectDto: CreateTablectDto[],
  ): Promise<IE_TableCT[]> {
    const result: IE_TableCT[] = [];
    createTablectDto.forEach(async (item) => {
      const newTableDto = await this.tablectRepository.create(item);
      const saved = await this.tablectRepository.save(newTableDto);
      result.push(saved);
    });

    return result;
  }

  async getTablect(): Promise<IE_TableCT[]> {
    return await this.tablectRepository.find();
  }
}
