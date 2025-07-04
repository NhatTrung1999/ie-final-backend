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

  async createTablect(createTablectDto: CreateTablectDto[]): Promise<void> {
    // console.log(createTablectDto);
    // const response: IE_TableCT[] = [];
    for (const item of createTablectDto) {
      const existingVideo = await this.tablectRepository.findOne({
        where: [{ id_video: item.id_video }],
      });

      if (existingVideo) {
        console.log(`Continue item duplicate!`);
        continue;
      }

      const newTablect = this.tablectRepository.create({
        id_video: item.id_video,
        no: item.no,
        progress_stage_part_name: item.progress_stage_part_name,
        area: item.area,
        nva: item.nva,
        va: item.va,
        confirm: item.confirm,
        created_by: 'admin',
        created_at: new Date(),
      });
      const result = await this.tablectRepository.save(newTablect);
      // response.push(result);
    }
    // return response;
  }

  async getTablect(): Promise<IE_TableCT[]> {
    return await this.tablectRepository.find();
  }
}
