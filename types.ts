
export enum UnitSystem {
  Metric = 'metrik',
  Imperial = 'imperial',
}

export enum BMICategory {
  Underweight = 'Berat Badan Kurang',
  Normal = 'Berat Badan Normal',
  Overweight = 'Kelebihan Berat Badan',
  Obese = 'Obesitas',
  Invalid = 'Input Tidak Valid'
}

export interface BMIData {
  value: number;
  category: BMICategory;
}

// This interface describes the structure returned by getBMICategoryDetails
export interface BMICategoryUIDetails {
  textColor: string;
  borderColor: string;
  description: string;
  range?: string;
}

export interface HistoryEntry {
  id: string;
  date: string;
  bmiData: BMIData;
}