import { Injectable } from '@nestjs/common';
// import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_HistoryPlayback } from './entities/history-playback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryPlaybackService {

  constructor(@InjectRepository(IE_HistoryPlayback) private historyPlaybackReposity: Repository<IE_HistoryPlayback>){}

  async createHistoryPlayback(payload) {
    // const 
    payload.forEach(async (item) => {
      const createHistoryPlaybackDto = this.historyPlaybackReposity.create(item)
      await this.historyPlaybackReposity.save(createHistoryPlaybackDto)
    });
  }
}
