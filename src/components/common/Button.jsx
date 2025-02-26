import React from 'react';
import './styles/Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const buttonClassName = `btn btn-${variant} ${className} ${disabled ? 'disabled' : ''}`;
  
  return (
    <button
      type={type}
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;