import { Module } from '@nestjs/common';
import { TablectService } from './tablect.service';
import { TablectController } from './tablect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_TableCT } from './entities/tablect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IE_TableCT])],
  controllers: [TablectController],
  providers: [TablectService],
})
export class TablectModule {}
