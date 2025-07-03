import { Controller, Body, Post } from '@nestjs/common';
import { HistoryPlaybackService } from './history-playback.service';
import { CreateHistoryPlaybackDto } from './dto/create-history-playback.dto';

@Controller('history-playback')
export class HistoryPlaybackController {
  constructor(private readonly historyPlaybackService: HistoryPlaybackService) {}

  @Post()
  createHistoryPlayback(@Body() body: CreateHistoryPlaybackDto) {
    return this.historyPlaybackService.createHistoryPlayback(body)
  }
  
}
