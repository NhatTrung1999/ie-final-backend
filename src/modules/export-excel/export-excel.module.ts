import { Module } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ExportExcelController } from './export-excel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IE_TableCT } from '../tablect/entities/tablect.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IE_TableCT])],
  controllers: [ExportExcelController],
  providers: [ExportExcelService],
})
export class ExportExcelModule {}
