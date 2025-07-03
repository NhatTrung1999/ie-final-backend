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

  async createTablect(createTablectDto: CreateTablectDto) {
    const tablect = this.tablectRepository.create(createTablectDto);
    return await this.tablectRepository.save(tablect);
  }

  async getTablect(): Promise<IE_TableCT[]> {
    return await this.tablectRepository.find();
  }
}
