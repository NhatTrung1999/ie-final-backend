import { Controller, Body, Post, Get, Query } from '@nestjs/common';
import { HistoryPlaybackService } from './history-playback.service';
import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { IE_HistoryPlayback } from './entities/history-playback.entity';

@Controller('history-playback')
export class HistoryPlaybackController {
  constructor(
    private readonly historyPlaybackService: HistoryPlaybackService,
  ) {}

  @Post()
  async saveHistoryPlayback(
    @Body() createHistoryPlaybackDto: CreateHistoryPlaybackDto[],
  ) {
    // console.log(createHistoryPlaybackDto);
    return this.historyPlaybackService.saveHistoryPlayback(
      createHistoryPlaybackDto,
    );
  }

  @Get()
  async getHistoryPlayback(
    @Query('date_from') date_from: string,
    @Query('date_to') date_to: string,
    @Query('season') season: string,
    @Query('stage') stage: string,
    @Query('area') area: string,
    @Query('article') article: string,
  ): Promise<IE_HistoryPlayback[]> {
    const response = await this.historyPlaybackService.getHistoryPlayback(
      date_from,
      date_to,
      season,
      stage,
      area,
      article,
    );
    return response;
  }
}
