import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import {
  ReportResponseDTO,
  ReportNotFoundDTO,
  CreateReportDTO,
  UpdateReportDTO,
} from 'src/dtos/report.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDTO(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDTO {
    const report = data.report.find(
      (report) => report.id === id && report.type === type,
    );
    if (!report) throw ReportNotFoundDTO;

    return new ReportResponseDTO(report);
  }

  createReport(body: CreateReportDTO, type: ReportType): ReportResponseDTO {
    const newReport = {
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
      type,
      ...body,
    };
    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }

  updateReport(
    body: UpdateReportDTO,
    type: ReportType,
    id: string,
  ): ReportResponseDTO {
    const report = data.report.find(
      (report) => report.id === id && report.type === type,
    );
    if (!report) throw ReportNotFoundDTO;

    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );
    const newReport = {
      ...report,
      ...body,
      updatedAt: new Date(),
    };
    data.report[reportIndex] = newReport;

    return new ReportResponseDTO(newReport);
  }

  deleteReport(type: ReportType, id: string) {
    const reportIndex = data.report.findIndex(
      (report) => report.id === id && report.type === type,
    );

    if (reportIndex === -1) throw ReportNotFoundDTO;

    data.report.splice(reportIndex, 1);
  }
}
