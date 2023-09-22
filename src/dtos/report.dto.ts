import { NotFoundException } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDTO {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsString()
  source: string;
}

export class UpdateReportDTO extends PartialType(CreateReportDTO) {}

export class ReportResponseDTO {
  id: string;

  @Expose({ name: 'created_at' })
  isExpense() {
    return this.createdAt;
  }

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;

  amount: number;
  source: string;
  type: ReportType;

  constructor(partial: Partial<ReportResponseDTO>) {
    Object.assign(this, partial);
  }
}

export const ReportNotFoundDTO = new NotFoundException('Report not found');
