import { Controller, Get, Query, Res } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { Response } from 'express';

@Controller('export-excel')
export class ExportExcelController {
  constructor(private readonly exportExcelService: ExportExcelService) {}

  @Get('export-excel-time-study')
  async exportExcelTimeStudy(
    @Query('date_from') date_from: string,
    @Query('date_to') date_to: string,
    @Query('season') season: string,
    @Query('stage') stage: string,
    @Query('area') area: string,
    @Query('article') article: string,
    @Res() res: Response,
  ) {
    // console.log(date_from, date_to, season, stage, area, article);
    const buffer = await this.exportExcelService.exportExcelTimeStudy(
      date_from,
      date_to,
      season,
      stage,
      area,
      article,
    );
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ExcelTimeStudy.xlsx',
    });
    res.send(buffer);
  }

  @Get('export-excel-lsa')
  async exportExcelLsa(
    @Query('date_from') date_from: string,
    @Query('date_to') date_to: string,
    @Query('season') season: string,
    @Query('stage') stage: string,
    @Query('area') area: string,
    @Query('article') article: string,
    @Res() res: Response,
  ) {
    const buffer = await this.exportExcelService.exportExcelLSA(
      date_from,
      date_to,
      season,
      stage,
      area,
      article,
    );
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ExcelLsa.xlsx',
    });
    res.send(buffer);
  }
}
