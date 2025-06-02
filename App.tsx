
import React, { useState, useCallback } from 'react';
import { UnitSystem, BMIData, BMICategory, HistoryEntry } from './types';
import { calculateAndCategorizeBMI, getBMICategoryDetails } from './utils/bmiCalculations';
import FormField from './components/FormField';
import UnitSelector from './components/UnitSelector';
import BMIDisplay from './components/BMIDisplay';
import HistoryList from './components/HistoryList'; // Import HistoryList

const MAX_HISTORY_ITEMS = 10;

const App: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(UnitSystem.Metric);
  
  const [heightCm, setHeightCm] = useState<string>('');
  const [weightKg, setWeightKg] = useState<string>('');
  
  const [heightFt, setHeightFt] = useState<string>('');
  const [heightIn, setHeightIn] = useState<string>('');
  const [weightLbs, setWeightLbs] = useState<string>('');

  const [bmiResult, setBmiResult] = useState<BMIData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const resetInputs = useCallback(() => {
    setHeightCm('');
    setWeightKg('');
    setHeightFt('');
    setHeightIn('');
    setWeightLbs('');
    setBmiResult(null);
    setError(null);
    // Note: History is not cleared on reset
  }, []);

  const handleUnitChange = useCallback((newUnit: UnitSystem) => {
    setUnitSystem(newUnit);
    resetInputs();
  }, [resetInputs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBmiResult(null);

    let h1: number, h2: number | undefined, w: number;

    try {
      if (unitSystem === UnitSystem.Metric) {
        h1 = parseFloat(heightCm);
        w = parseFloat(weightKg);
        if (isNaN(h1) || isNaN(w) || h1 <= 0 || w <= 0) {
          setError('Masukkan angka positif yang valid untuk tinggi dan berat badan.');
          return;
        }
      } else { // Imperial
        h1 = parseFloat(heightFt);
        h2 = parseFloat(heightIn || '0');
        w = parseFloat(weightLbs);
        
        const totalHeightInches = (isNaN(h1) ? 0 : h1 * 12) + (isNaN(h2) ? 0 : h2);

        if (isNaN(w) || totalHeightInches <= 0 || w <= 0) {
           setError('Masukkan angka positif yang valid untuk tinggi (ft dan/atau inci) dan berat (lbs).');
           return;
        }
        h1 = isNaN(h1) ? 0 : h1;
      }

      const result = calculateAndCategorizeBMI(h1, h2, w, unitSystem);
      if (result) {
        if (result.category === BMICategory.Invalid) {
            const details = getBMICategoryDetails(result.category);
            setError(details.description); // Already translated in bmiCalculations
            setBmiResult(result); // Show "Input Tidak Valid" in BMIDisplay
        } else {
            setBmiResult(result);
            // Add to history
            const newEntry: HistoryEntry = {
              id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, // Unique ID
              date: new Date().toLocaleString('id-ID'), // Use Indonesian locale for date
              bmiData: result,
            };
            setHistory(prevHistory => [newEntry, ...prevHistory].slice(0, MAX_HISTORY_ITEMS));
        }
      } else {
        setError('Tidak dapat menghitung BMI. Silakan periksa input Anda.');
      }
    } catch (err) {
      setError('Terjadi kesalahan tak terduga. Silakan coba lagi.');
      console.error(err);
    }
  };

  const handleDeleteHistoryEntry = useCallback((id: string) => {
    setHistory(prevHistory => prevHistory.filter(entry => entry.id !== id));
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-slate-800/70 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-slate-700 mb-8">
        <div>
          <h2 className="mt-4 mb-8 text-center text-4xl font-extrabold text-cyan-400 tracking-tight">
            Kalkulator BMI
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <UnitSelector selectedUnit={unitSystem} onUnitChange={handleUnitChange} />

          {unitSystem === UnitSystem.Metric ? (
            <>
              <FormField
                label="Tinggi Badan"
                id="heightCm"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                unit="cm"
                placeholder="cth: 170"
              />
              <FormField
                label="Berat Badan"
                id="weightKg"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                unit="kg"
                placeholder="cth: 65"
              />
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <FormField
                  label="Tinggi Badan (ft)"
                  id="heightFt"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  unit="ft"
                  placeholder="cth: 5"
                />
                <FormField
                  label="Inci"
                  labelClassName="text-right sm:text-left text-slate-400" 
                  id="heightIn"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  unit="in"
                  placeholder="cth: 9"
                  required={false} 
                />
              </div>
              <FormField
                label="Berat Badan"
                id="weightLbs"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                unit="lbs"
                placeholder="cth: 150"
              />
            </>
          )}

          {error && bmiResult?.category !== BMICategory.Invalid && ( // Don't show generic error if BMIDisplay shows "Input Tidak Valid"
            <div className="rounded-md bg-red-900/70 border border-red-700 p-3 shadow-md">
              <div className="flex">
                <div className="ml-2">
                  <p className="text-sm font-medium text-red-300">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between space-x-4 pt-2">
            <button
              type="button"
              onClick={resetInputs}
              className="group relative w-1/2 flex justify-center py-3 px-4 border border-slate-600 text-sm font-medium rounded-lg text-slate-300 bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-colors"
            >
              Atur Ulang
            </button>
            <button
              type="submit"
              className="group relative w-1/2 flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all"
            >
              Hitung BMI
            </button>
          </div>
        </form>

        {bmiResult && <BMIDisplay bmiData={bmiResult} />}
      </div>

      {history.length > 0 && (
        <div className="max-w-md w-full">
          <HistoryList history={history} onDelete={handleDeleteHistoryEntry} />
        </div>
      )}
    </div>
  );
};

export default App;