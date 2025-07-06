import { Injectable } from '@nestjs/common';
// import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_HistoryPlayback } from './entities/history-playback.entity';
import { Repository } from 'typeorm';
import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';

@Injectable()
export class HistoryPlaybackService {
  constructor(
    @InjectRepository(IE_HistoryPlayback)
    private historyPlaybackReposity: Repository<IE_HistoryPlayback>,
  ) {}

  async createHistoryPlayback(
    createHistoryPlaybackDto: CreateHistoryPlaybackDto[],
  ) {
    // console.log(createHistoryPlaybackDto);
    for (const item of createHistoryPlaybackDto) {
      const existingVideo = await this.historyPlaybackReposity.findOne({
        where: [{ id_historyplayback: item.id_historyplayback }],
      });
      if (existingVideo) {
        console.log(`Continue item duplicate!`);
        continue;
      }
      const newHistoryPlaybackDto = await this.historyPlaybackReposity.create({
        id_historyplayback: item.id_historyplayback,
        id_tablect: item.id_tablect,
        start_time: item.start_time,
        end_time: item.end_time,
        type: item.type,
        created_by: item.created_by || 'admin',
        created_at: item.created_at || new Date(),
      });
      await this.historyPlaybackReposity.save(newHistoryPlaybackDto);
    }
  }

  async getHistoryPlayback(): Promise<IE_HistoryPlayback[]> {
    return await this.historyPlaybackReposity.find();
  }
}
