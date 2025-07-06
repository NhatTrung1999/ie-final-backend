import { Controller, Body, Post, Get } from '@nestjs/common';
import { HistoryPlaybackService } from './history-playback.service';
import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';
import { IE_HistoryPlayback } from './entities/history-playback.entity';

@Controller('history-playback')
export class HistoryPlaybackController {
  constructor(
    private readonly historyPlaybackService: HistoryPlaybackService,
  ) {}

  @Post()
  createHistoryPlayback(
    @Body() createHistoryPlaybackDto: CreateHistoryPlaybackDto[],
  ) {
    // console.log(createHistoryPlaybackDto);
    return this.historyPlaybackService.createHistoryPlayback(
      createHistoryPlaybackDto,
    );
  }

  @Get()
  async getHistoryPlayback(): Promise<IE_HistoryPlayback[]> {
    const response = await this.historyPlaybackService.getHistoryPlayback();
    return response;
  }
}
