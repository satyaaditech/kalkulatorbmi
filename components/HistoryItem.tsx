
import React from 'react';
import { HistoryEntry } from '../types';
import { getBMICategoryDetails } from '../utils/bmiCalculations';

interface HistoryItemProps {
  entry: HistoryEntry;
  onDelete: (id: string) => void;
}

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.56 0c1.153 0 2.243.032 3.223.094M7.5 5.25l.47-2.742A1.875 1.875 0 019.87 1h4.26a1.875 1.875 0 011.872 1.508l.47 2.742M6.375 5.25h11.25" />
  </svg>
);

const HistoryItem: React.FC<HistoryItemProps> = ({ entry, onDelete }) => {
  const { bmiData, date, id } = entry;
  const categoryDetails = getBMICategoryDetails(bmiData.category);

  return (
    <li className="flex items-center justify-between p-4 bg-slate-700/50 backdrop-blur-sm rounded-lg shadow-md border border-slate-600/70 hover:border-slate-500 transition-all duration-200">
      <div className="flex-grow">
        <p className="text-xs text-slate-400 mb-1">{date}</p>
        <p className="text-lg font-semibold text-slate-100">
          BMI: <span className={`${categoryDetails.textColor} font-bold`}>{bmiData.value.toFixed(1)}</span>
        </p>
        <p className={`text-sm ${categoryDetails.textColor}`}>
          Kategori: <span className="font-medium">{bmiData.category}</span>
        </p>
      </div>
      <button
        onClick={() => onDelete(id)}
        aria-label={`Hapus entri riwayat untuk BMI ${bmiData.value.toFixed(1)} pada ${date}`}
        className="p-2 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-600/70 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-700 transition-colors"
      >
        <TrashIcon />
      </button>
    </li>
  );
};

export default HistoryItem;