import { Controller, Get, Res } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { Response } from 'express';

@Controller('export-excel')
export class ExportExcelController {
  constructor(private readonly exportExcelService: ExportExcelService) {}

  @Get('export-excel-time-study')
  async exportExcelTimeStudy(@Res() res: Response) {
    const buffer = await this.exportExcelService.exportExcelTimeStudy();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ExcelTimeStudy.xlsx',
    });
    res.send(buffer);
  }

  @Get('export-excel-lsa')
  async exportExcelLsa(@Res() res: Response) {
    const buffer = await this.exportExcelService.exportExcelLSA();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=ExcelLsa.xlsx',
    });
    res.send(buffer);
  }
}
