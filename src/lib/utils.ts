import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Papa from "papaparse";

interface CSVRow {
  [key: string]: string;
  id: string;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseCSVData = (csvData: string): CSVRow[] => {
  const parsedData = Papa.parse<CSVRow>(csvData, { header: true });
  const structuredData: CSVRow[] = parsedData.data.map((row, index) => ({
    ...row,
    id: `${index + 1}`,
  }));
  const slicedData = structuredData.slice(0, -1) 
  return slicedData;
};
