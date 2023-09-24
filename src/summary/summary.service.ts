import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
  constructor(private readonly reportService: ReportService) {}

  calculateSummary() {
    const allIncome = this.reportService.getAllReports(ReportType.INCOME);
    const allExpense = this.reportService.getAllReports(ReportType.EXPENSE);
    const totalIncome = allIncome.reduce((acc, cur) => acc + cur.amount, 0);
    const totalExpense = allExpense.reduce((acc, cur) => acc + cur.amount, 0);
    const netIncome = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      netIncome,
    };
  }
}
