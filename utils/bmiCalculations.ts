
import { UnitSystem, BMICategory, BMIData, BMICategoryUIDetails } from '../types';

const BMI_CATEGORIES_DETAILS: Record<BMICategory, BMICategoryUIDetails> = {
  [BMICategory.Underweight]: { textColor: 'text-sky-400', borderColor: 'border-sky-600', description: 'BMI Anda menunjukkan berat badan Anda kurang.', range: '< 18.5' },
  [BMICategory.Normal]: { textColor: 'text-green-400', borderColor: 'border-green-600', description: 'BMI Anda dalam rentang normal.', range: '18.5 – 24.9' },
  [BMICategory.Overweight]: { textColor: 'text-yellow-400', borderColor: 'border-yellow-600', description: 'BMI Anda menunjukkan Anda kelebihan berat badan.', range: '25 – 29.9' },
  [BMICategory.Obese]: { textColor: 'text-orange-400', borderColor: 'border-orange-600', description: 'BMI Anda menunjukkan Anda dalam rentang obesitas.', range: '≥ 30' },
  [BMICategory.Invalid]: { textColor: 'text-slate-400', borderColor: 'border-slate-600', description: 'Tidak dapat menghitung BMI karena input tidak valid.', range: '-' },
};


export const calculateAndCategorizeBMI = (
  height1: number, // cm or ft
  height2: number | undefined, // inches, only for imperial
  weight: number,
  unitSystem: UnitSystem
): BMIData | null => {
  let bmiValue: number | null = null;

  if (unitSystem === UnitSystem.Metric) {
    // height1 is cm, weight is kg
    if (height1 <= 0 || weight <= 0) return null;
    const heightM = height1 / 100;
    bmiValue = weight / (heightM * heightM);
  } else {
    // height1 is ft, height2 is inches, weight is lbs
    const totalInches = (height1 * 12) + (height2 || 0);
    if (totalInches <= 0 || weight <= 0) return null;
    
    const heightM = totalInches * 0.0254;
    const weightKg = weight * 0.45359237;
    bmiValue = weightKg / (heightM * heightM);
  }

  if (bmiValue === null || isNaN(bmiValue) || !isFinite(bmiValue)) {
    return {
      value: 0,
      category: BMICategory.Invalid,
    };
  }
  
  const roundedBmi = parseFloat(bmiValue.toFixed(1));
  let category: BMICategory;

  if (roundedBmi < 18.5) {
    category = BMICategory.Underweight;
  } else if (roundedBmi < 25) {
    category = BMICategory.Normal;
  } else if (roundedBmi < 30) {
    category = BMICategory.Overweight;
  } else {
    category = BMICategory.Obese;
  }
  
  return {
    value: roundedBmi,
    category: category,
  };
};

export const getBMICategoryDetails = (category: BMICategory): BMICategoryUIDetails => {
    return BMI_CATEGORIES_DETAILS[category];
}