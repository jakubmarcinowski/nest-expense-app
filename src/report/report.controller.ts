import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import {
  ReportResponseDTO,
  CreateReportDTO,
  UpdateReportDTO,
} from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ): ReportResponseDTO[] {
    return this.reportService.getAllReports(type);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDTO {
    return this.reportService.getReportById(type, id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDTO,
    @Param('type') type: ReportType,
  ): ReportResponseDTO {
    return this.reportService.createReport(body, type);
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDTO,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDTO {
    return this.reportService.updateReport(body, type, id);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.reportService.deleteReport(type, id);
  }
}
