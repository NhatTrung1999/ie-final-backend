import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_Video } from './entities/video.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { CreateVideoDto } from './dto/create-video.dto';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          const { date, season, stage, area, article } =
            req.body as CreateVideoDto;
          const uploadPath = `./uploads/${date}/${season}/${stage}/${area}/${article}`;
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
      fileFilter: (req, file, cb) => {
        const { date, season, stage, area, article } =
          req.body as CreateVideoDto;
        const uploadDir = `./uploads/${date}/${season}/${stage}/${area}/${article}`;
        const fullPathToExistingFile = path.join(uploadDir, file.originalname);
        if (!file.originalname.match(/\.(mp4|avi|mkv|mov|flv|wmv|MOV)$/)) {
          return cb(new Error('Chỉ cho phép định dạng video!'), false);
        }
        if (fs.existsSync(fullPathToExistingFile)) {
          console.log(`File '${file.originalname}' đã tồn tại. Bỏ qua upload.`);
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
    TypeOrmModule.forFeature([IE_Video]),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
