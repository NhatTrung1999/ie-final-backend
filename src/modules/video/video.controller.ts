import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  async getVideo() {
    const response = await this.videoService.getVideo();
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
