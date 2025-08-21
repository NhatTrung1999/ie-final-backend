import { Injectable } from '@nestjs/common';
import { CreateTablectDto } from './dto/create-tablect.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IE_Department_MachineType,
  IE_TableCT,
} from './entities/tablect.entity';
import { Repository } from 'typeorm';
import { IE_HistoryPlayback } from '../history-playback/entities/history-playback.entity';
import { IE_Video } from '../video/entities/video.entity';

@Injectable()
export class TablectService {
  constructor(
    @InjectRepository(IE_TableCT)
    private tablectRepository: Repository<IE_TableCT>,
    @InjectRepository(IE_HistoryPlayback)
    private historyPlaybackReposity: Repository<IE_HistoryPlayback>,
    @InjectRepository(IE_Department_MachineType)
    private machineTypeReposity: Repository<IE_Department_MachineType>,
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
        video_path: item.video_path,
        created_by: 'admin',
        created_at: new Date(),
      });
      await this.tablectRepository.save(newTablect);
      // response.push(result);
    }
  }

  async saveTablect(createTablectDto: CreateTablectDto): Promise<void> {
    const item = { ...createTablectDto };
    const newTablect = this.tablectRepository.create({
      id_video: item.id_video,
      no: item.no,
      progress_stage_part_name: item.progress_stage_part_name,
      area: item.area,
      nva: item.nva,
      va: item.va,
      is_save: item.is_save,
      confirm: item.confirm,
      machine_type: item.machine_type || '',
      video_path: item.video_path,
      created_by: item.created_by || '',
      created_at: new Date(),
    });
    await this.tablectRepository.save(newTablect);
  }

  async getTablect(
    date_from: string,
    date_to: string,
    season: string,
    stage: string,
    area: string,
    article: string,
    account: string,
  ): Promise<IE_TableCT[]> {
    const query = this.tablectRepository
      .createQueryBuilder('tablect')
      .leftJoin(IE_Video, 'video', 'tablect.id_video = video.id');

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

    if (account) {
      query.andWhere('tablect.created_by = :account', {
        account,
      });
    }
    // console.log(await query.getMany());

    return await query.getMany();
  }

  async confirmTablect(confirmTablectDto: CreateTablectDto[]): Promise<void> {
    for (const item of confirmTablectDto) {
      const tablect = await this.tablectRepository.findOne({
        where: { id_video: item.id_video },
      });
      if (!tablect) {
        continue;
      }

      const newTablect = {
        ...tablect,
        confirm: item.confirm,
      };

      // console.log(tablect);

      await this.tablectRepository.save(newTablect);
    }
  }

  async deleteTablect(id: number): Promise<void> {
    try {
      await this.historyPlaybackReposity.delete({ id_tablect: id });
      await this.tablectRepository.delete({ id_video: id });
    } catch (error) {
      throw error;
    }
  }

  async getMachineType() {
    try {
      return await this.machineTypeReposity.find();
    } catch (error) {
      throw error;
    }
  }
}
