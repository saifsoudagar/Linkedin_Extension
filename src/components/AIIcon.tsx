import React, { useState } from 'react';
import Modal from './Modal';
import aiIcon from '../../public/assets/ai-icon.svg'; 

// Define the types for the Modal component's props
interface ModalProps {
  onClose: () => void;
}

const AIIcon: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handleIconClick = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return (
    <>
      {/* AI Icon Trigger */}
      <div onClick={handleIconClick} id="ai-icon-root" className="cursor-pointer">
        <img src={aiIcon} alt="AI Icon" width={40} height={40} />
      </div>

      {/* Modal Rendering */}
      {isModalOpen && <Modal onClose={closeModal} />}
    </>
  );
};

export default AIIcon;
