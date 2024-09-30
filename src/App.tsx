import React, { useState, useEffect } from 'react';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleIconClick = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Safely access chrome.runtime.getURL
  const aiIconUrl =
    typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL
      ? chrome.runtime.getURL('public/assets/ai-icon.svg')
      : 'path/to/local/ai-icon.svg'; // Provide a fallback image path

  return (
    <div>
      {isModalOpen && <Modal onClose={closeModal} />}
      <div onClick={handleIconClick} className="ai-icon" style={{ cursor: 'pointer' }}>
        <img src={aiIconUrl} alt="AI Icon" style={{ width: '40px', height: '40px' }} />
      </div>
    </div>
  );
};

export default App;
