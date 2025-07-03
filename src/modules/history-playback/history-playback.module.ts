import { Module } from '@nestjs/common';
import { HistoryPlaybackService } from './history-playback.service';
import { HistoryPlaybackController } from './history-playback.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_HistoryPlayback } from './entities/history-playback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IE_HistoryPlayback])],
  controllers: [HistoryPlaybackController],
  providers: [HistoryPlaybackService],
})
export class HistoryPlaybackModule {}
