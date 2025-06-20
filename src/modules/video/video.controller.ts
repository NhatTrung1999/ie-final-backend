import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
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
    try {
      await this.videoService.uploadVideo(body, videos);
      return {
        message: 'Upload is successfull!',
      };
    } catch (error: any) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async getFindAllVideo() {
    const response = await this.videoService.getFindAllVideo();
    return {
      data: response,
    };
  }
}
