import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/passport/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoModule } from './modules/video/video.module';
import { TablectModule } from './modules/tablect/tablect.module';
import { HistoryPlaybackModule } from './modules/history-playback/history-playback.module';
import { ExportExcelModule } from './modules/export-excel/export-excel.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'frontend', 'dist')
    // }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get('DT_HOST'),
        port: +configService.get('DT_PORT'),
        username: configService.get('DT_USERNAME'),
        password: configService.get('DT_PASSWORD'),
        database: configService.get('DT_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        options: {
          encrypt: false,
          enableArithAbort: true,
          // instanceName: 'eipsystem'
        },
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    VideoModule,
    TablectModule,
    HistoryPlaybackModule,
    ExportExcelModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
