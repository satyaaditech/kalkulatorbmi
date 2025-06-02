
import React from 'react';
import { UnitSystem } from '../types';

interface UnitSelectorProps {
  selectedUnit: UnitSystem;
  onUnitChange: (unit: UnitSystem) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ selectedUnit, onUnitChange }) => {
  return (
    <div className="mb-6">
      <fieldset>
        <legend className="text-base font-medium text-slate-300 mb-3">Sistem Satuan</legend>
        <div className="flex items-center space-x-6">
          {(Object.values(UnitSystem) as UnitSystem[]).map((unitValue) => {
            return (
              <div key={unitValue} className="flex items-center">
                <input
                  id={`unit-${unitValue}`}
                  name="unit-system"
                  type="radio"
                  value={unitValue}
                  checked={selectedUnit === unitValue}
                  onChange={() => onUnitChange(unitValue)}
                  className="focus:ring-cyan-600 h-4 w-4 text-cyan-500 border-slate-500 bg-slate-700"
                />
                <label htmlFor={`unit-${unitValue}`} className="ml-2 block text-sm text-slate-300 capitalize">
                  {unitValue}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
};

export default UnitSelector;