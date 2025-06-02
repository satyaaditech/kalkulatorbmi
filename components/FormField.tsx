
import React from 'react';

interface FormFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  unit?: string;
  min?: string;
  step?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'number',
  placeholder,
  unit,
  min = "0",
  step = "any",
  required = true,
  className = "",
  labelClassName = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className={`block text-sm font-medium text-slate-300 mb-1 ${labelClassName}`}>
        {label}
      </label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          name={id}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          step={step}
          required={required}
          className="block w-full pr-12 sm:text-sm rounded-md py-2 px-3 bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-cyan-500 focus:border-cyan-500 caret-cyan-500"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormField;