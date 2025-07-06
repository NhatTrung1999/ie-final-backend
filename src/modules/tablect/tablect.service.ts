import { Injectable } from '@nestjs/common';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_TableCT } from './entities/tablect.entity';
import { Repository } from 'typeorm';
import { IE_HistoryPlayback } from '../history-playback/entities/history-playback.entity';

@Injectable()
export class TablectService {
  constructor(
    @InjectRepository(IE_TableCT)
    private tablectRepository: Repository<IE_TableCT>,
    @InjectRepository(IE_HistoryPlayback)
    private historyPlaybackReposity: Repository<IE_HistoryPlayback>,
  ) {}

  async createTablect(createTablectDto: CreateTablectDto[]): Promise<void> {
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
  }

  async getTablect(): Promise<IE_TableCT[]> {
    return await this.tablectRepository.find();
  }

  async deleteTablect(id: number): Promise<void> {
    try {
      await this.historyPlaybackReposity.delete({ id_tablect: id });
      await this.tablectRepository.delete({ id_video: id });
    } catch (error) {
      throw error;
    }
  }
}
