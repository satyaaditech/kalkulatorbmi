
import React from 'react';
import { HistoryEntry } from '../types';
import HistoryItem from './HistoryItem';

interface HistoryListProps {
  history: HistoryEntry[];
  onDelete: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onDelete }) => {
  if (history.length === 0) {
    return null; 
    // Or you could return:
    // <div className="mt-8 text-center text-slate-400">Belum ada riwayat perhitungan.</div>
  }

  return (
    <div className="mt-10 w-full bg-slate-800/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
      <h3 className="text-2xl font-semibold text-cyan-400 mb-6 text-center sm:text-left">
        Riwayat Perhitungan
      </h3>
      <ul className="space-y-4">
        {history.map(entry => (
          <HistoryItem key={entry.id} entry={entry} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;