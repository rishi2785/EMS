import React from 'react';
import './styles/DatePicker.css';

const DatePicker = ({ 
  id, 
  name, 
  value, 
  onChange, 
  min = '', 
  max = '', 
  hasError = false,
  disabled = false
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };
  
  const className = `date-picker ${hasError ? 'error' : ''} ${disabled ? 'disabled' : ''}`;
  
  return (
    <input
      type="date"
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      min={min}
      max={max}
      className={className}
      disabled={disabled}
    />
  );
};

export default DatePicker;