import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateVideoDto } from './dto/create-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('upload-video')
  @UseInterceptors(FilesInterceptor('videos', 5))
  async handleUploadVideo(
    @Body() body: CreateVideoDto,
    @UploadedFiles() videos: Array<Express.Multer.File>,
  ) {
    // console.log(body, videos);
    try {
      const response = await this.videoService.uploadVideo(body, videos);
      return {
        message: 'Upload video is successfull!',
        status: 200,
        data: response,
      };
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getVideo(
    @Query('date_from') date_from: string,
    @Query('date_to') date_to: string,
    @Query('season') season: string,
    @Query('stage') stage: string,
    @Query('area') area: string,
    @Query('article') article: string,
  ) {
    const response = await this.videoService.getVideo(
      date_from,
      date_to,
      season,
      stage,
      area,
      article,
    );

    // console.log(date_from, date_to, season, stage, area, article);
    return {
      status: 200,
      data: response,
    };
  }

  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    try {
      await this.videoService.deleteVideo(parseInt(id));
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }
}
