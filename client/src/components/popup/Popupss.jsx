import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import "./popup.css"
function Popupss() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPopupVisible(true);
    }, 1000); // Adjust the delay as needed
  }, []);

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
      {isPopupVisible && createPortal(
        <div className="popup">
          <button onClick={handleClose}>X</button>
          <img src="popimg.png" alt="Popup Image" onClick={handleClose} />
        </div>,
        document.body
      )}
    </>
  );
}

export default Popupss;
