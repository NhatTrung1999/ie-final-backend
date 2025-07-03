import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryPlaybackDto } from './create-history-playback.dto';

export class UpdateHistoryPlaybackDto extends PartialType(CreateHistoryPlaybackDto) {}
