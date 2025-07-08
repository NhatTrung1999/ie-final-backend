import { Injectable } from '@nestjs/common';
// import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_HistoryPlayback } from './entities/history-playback.entity';
import { Repository } from 'typeorm';
import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { IE_Video } from '../video/entities/video.entity';

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

  async getHistoryPlayback(
    date_from: string,
    date_to: string,
    season: string,
    stage: string,
    area: string,
    article: string,
  ): Promise<IE_HistoryPlayback[]> {
    const query = this.historyPlaybackReposity
      .createQueryBuilder('historyplayback')
      .leftJoin(IE_Video, 'video', 'video.id = historyplayback.id_tablect');
    
      if (date_from && date_to) {
        query.andWhere('video.date >= :date_from AND video.date <= :date_to', {
          date_from,
          date_to,
        });
      } else if (date_from) {
        query.andWhere('video.date >= :date_from', { date_from });
      } else if (date_to) {
        query.andWhere('video.date <= :date_to', { date_to });
      }

      if (season)
        query.andWhere('video.season LIKE :season', { season: `%${season}%` });
      if (stage)
        query.andWhere('video.stage LIKE :stage', { stage: `%${stage}%` });
      if (area) query.andWhere('video.area LIKE :area', { area: `%${area}%` });
      if (article)
        query.andWhere('video.article LIKE :article', {
          article: `%${article}%`,
        });

    return await query.getMany();
  }
}
