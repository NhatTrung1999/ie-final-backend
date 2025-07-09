import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import * as path from 'path';
import * as fs from 'fs';
import { IE_TableCT } from '../tablect/entities/tablect.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(IE_Video) private videosRepository: Repository<IE_Video>,
    @InjectRepository(IE_TableCT)
    private tablectRepository: Repository<IE_TableCT>,
  ) {}

  async uploadVideo(
    body: CreateVideoDto,
    videos: Array<Express.Multer.File>,
  ): Promise<IE_Video[]> {
    const { date, season, stage, area, article, created_by } = body;
    const savedVideos: IE_Video[] = [];

    const uploadBasePath = path.join(
      process.cwd(),
      'uploads',
      date,
      season,
      stage,
      area,
      article,
    );
    if (!fs.existsSync(uploadBasePath)) {
      fs.mkdirSync(uploadBasePath, { recursive: true });
    }

    for (const file of videos) {
      const filePath = path.join(uploadBasePath, file.originalname);
      if (fs.existsSync(filePath)) {
        console.log(`File already exists: ${file.originalname}`);
        continue; // bỏ qua file trùng
      }

      try {
        fs.writeFileSync(filePath, file.buffer);
      } catch (err) {
        console.error(`Failed to save file: ${file.originalname}`);
        continue;
      }

      const videoRecord = this.videosRepository.create({
        date,
        season,
        stage,
        area,
        article,
        video_name: file.originalname,
        // video_path: `http://localhost:3000/uploads/${date}/${season}/${stage}/${area}/${article}/${file.originalname}`,
        video_path: `http://192.168.18.42:3000/uploads/${date}/${season}/${stage}/${area}/${article}/${file.originalname}`,
        created_by,
        created_at: new Date(),
      });
      const saved = await this.videosRepository.save(videoRecord);
      savedVideos.push(saved);
    }

    return savedVideos;
  }

  async getVideo(
    date_from: string,
    date_to: string,
    season: string,
    stage: string,
    area: string,
    article: string,
  ): Promise<IE_Video[]> {
    const query = this.videosRepository.createQueryBuilder('video');

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

  async deleteVideo(id: number): Promise<void> {
    const video = await this.videosRepository.findOne({
      where: { id },
      relations: ['tablect', 'tablect.historyPlaybacks'],
    });

    if (!video) {
      throw new BadRequestException(`Video with ID ${id} not found`);
    }

    if (video.tablect !== null) {
      throw new BadRequestException(
        `Cannot delete video with ID ${id}. Please delete related history playbacks in IE_TableCT first.`,
      );
    }

    const filePath = path.join(
      process.cwd(),
      video.video_path.replace('http://192.168.18.42:3000/', ''),
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await this.videosRepository.delete(id);
  }
}
