import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IE_Video } from './entities/video.entity';
import { Repository } from 'typeorm';
import { CreateVideoDto } from './dto/create-video.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(IE_Video) private videosRepository: Repository<IE_Video>,
  ) {}

  async uploadVideo(
    body: CreateVideoDto,
    videos: Array<Express.Multer.File>,
  ): Promise<IE_Video[]> {
    const { date, season, stage, area, article, created_by } = body;
    const response: IE_Video[] = [];
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
      const result = await this.videosRepository.save(newUploadVideo);
      response.push(result);
    }
    return response;
  }

  async getVideo(): Promise<IE_Video[]> {
    return await this.videosRepository.find();
  }

  async deleteVideo(id: number): Promise<void> {
    const video = await this.videosRepository.findOne({ where: { id } });
    if (!video) {
      throw new BadRequestException(`Video with ID ${id} not found`);
    }

    const filePath = path.join(
      process.cwd(),
      video.video_path.replace('http://localhost:3000/', ''),
    );
    // console.log(filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    await this.videosRepository.delete(id);
  }
}
