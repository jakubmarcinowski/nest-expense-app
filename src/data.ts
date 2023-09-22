export interface ReportSchema {
  id: string;
  source: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  type: ReportType;
}

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

interface Data {
  report: ReportSchema[];
}

export const data: Data = {
  report: [
    {
      id: '6150f639-3f88-46f8-b692-436e36696f8f',
      source: 'Salary',
      amount: 1000,
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
      type: ReportType.INCOME,
    },
    {
      id: 'b526a314-28cb-4bdb-8cb1-19c191095578',
      source: 'Dividends',
      amount: 100,
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
      type: ReportType.INCOME,
    },
    {
      id: '750f875a-d065-4544-ae39-2a5035991ea0',
      source: 'Car',
      amount: 500,
      createdAt: new Date('2020-01-01'),
      updatedAt: new Date('2020-01-01'),
      type: ReportType.EXPENSE,
    },
  ],
};
