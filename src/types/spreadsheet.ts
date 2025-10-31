import z from "zod";

export type SpreadsheetData = {
  url: string;
};

export interface SpreadsheetResponse {
  message: string;
  data: SpreadsheetData;
}

export const FormGenerateSpreadsheetSchema = z.object({
  startDate: z.date({
    message: 'Por favor, selecione a data inicial.',
  }),
  endDate: z.date({
    message: 'Por favor, selecione a data final.',
  }),
}).refine(
  (data) => data.endDate >= data.startDate,
  {
    message: 'A data final deve ser maior ou igual à data inicial.',
    path: ['endDate'],
  }
);

export type FormGenerateSpreadsheet = z.infer<typeof FormGenerateSpreadsheetSchema>;