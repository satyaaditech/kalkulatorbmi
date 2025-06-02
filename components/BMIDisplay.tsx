
import React from 'react';
import { BMIData, BMICategory } from '../types';
import { getBMICategoryDetails } from '../utils/bmiCalculations';

interface BMIDisplayProps {
  bmiData: BMIData | null;
}

const BMIDisplay: React.FC<BMIDisplayProps> = ({ bmiData }) => {
  if (!bmiData) {
    return null;
  }

  const details = getBMICategoryDetails(bmiData.category);

  return (
    <div 
      className={`mt-8 p-6 rounded-xl shadow-2xl bg-slate-700/60 backdrop-blur-sm border ${details.borderColor} transition-all duration-300 ease-in-out`}
      role="alert"
      aria-live="assertive"
    >
      <h3 className="text-xl font-semibold mb-3 text-cyan-300">Hasil BMI Anda</h3>
      {bmiData.category !== BMICategory.Invalid ? (
        <>
          <p className={`text-5xl font-bold ${details.textColor}`}>{bmiData.value.toFixed(1)}</p>
          <p className={`text-lg capitalize mt-2 ${details.textColor}`}>
            Kategori: <span className="font-semibold">{bmiData.category} ({details.range})</span>
          </p>
          <p className="mt-3 text-sm text-slate-300">{details.description}</p>
        </>
      ) : (
        <>
          <p className={`text-lg capitalize mt-1 ${details.textColor}`}>
            Kategori: <span className="font-semibold">{bmiData.category}</span>
          </p>
          <p className="mt-2 text-sm text-slate-300">{details.description}</p>
        </>
      )}
    </div>
  );
};

export default BMIDisplay;