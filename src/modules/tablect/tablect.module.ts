import { Module } from '@nestjs/common';
import { TablectService } from './tablect.service';
import { TablectController } from './tablect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_Department, IE_Department_MachineType, IE_TableCT } from './entities/tablect.entity';
import { IE_HistoryPlayback } from '../history-playback/entities/history-playback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IE_TableCT, IE_HistoryPlayback, IE_Department, IE_Department_MachineType])],
  controllers: [TablectController],
  providers: [TablectService],
})
export class TablectModule {}
