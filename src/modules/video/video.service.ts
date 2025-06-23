import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(IE_Video) private videosRepository: Repository<IE_Video>,
  ) {}

  async uploadVideo(body: CreateVideoDto, videos: Array<Express.Multer.File>) {
    const { date, season, stage, area, article, created_by } = body;
    for (const video of videos) {
      const existingVideo = await this.videosRepository.findOne({
        where: [{ video_name: video.originalname, video_path: video.path }],
      });

      if (existingVideo) {
        console.log(`Conflict ${video.originalname} and path ${video.path}`);
        continue;
      }

      const newUploadVideo = this.videosRepository.create({
        date,
        season,
        stage,
        area,
        article,
        video_name: video.originalname,
        video_path: `http://localhost:3000/${video.path}`,
        created_by,
        created_at: new Date(),
      });
      await this.videosRepository.save(newUploadVideo);
    }
  }

  async getVideo(): Promise<IE_Video[]> {
    return await this.videosRepository.find();
  }
}
