import React, { useEffect } from 'react';
import './styles/Modal.css'

const Modal = ({ 
  show, 
  title, 
  children, 
  footer, 
  onClose, 
  size = 'medium' 
}) => {
  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);
  
  // Close on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && show) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [show, onClose]);
  
  if (!show) {
    return null;
  }
  
  // Close when clicking on backdrop (outside modal content)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const modalClassName = `modal-content modal-${size}`;
  
  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={modalClassName}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
