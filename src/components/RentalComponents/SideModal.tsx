  import React, { useState } from 'react';
  import { Modal } from 'antd';
import MovieDetailsByRentalId from './MovieDetailsByRentalId';
import CustomerDetailsByRentalId from './CustomerDetailsByRentalId';
import StoreDetailsByRentalId from './StoreDetailsByRentalId';

  interface SideModalProps {
    isVisible: boolean;
    onClose: () => void;
    rentalId: number;
  }

  const tabs = [
    { id: '1', label: 'Movie Details' },
    { id: '2', label: 'Customer Details' },
    { id: '3', label: 'Store Details' }
  ];

  const SideModal: React.FC<SideModalProps> = ({ isVisible, onClose, rentalId }) => {
    console.log('rentalId', rentalId);
    const [activeTab, setActiveTab] = useState('1');

    const renderTabContent = () => {
      switch(activeTab) {
        case '1':
        return <MovieDetailsByRentalId rentalId={rentalId} isOpen={isVisible} />;
        case '2':
        return <CustomerDetailsByRentalId rentalId={rentalId} isOpen={isVisible} />;
        case '3':
        return <StoreDetailsByRentalId rentalId={rentalId} isOpen={isVisible} />;
        default:
          return null;
      }
    };

    return (
      <Modal
        open={isVisible}
        onCancel={onClose}
        footer={null}
        width={600}
        maskClosable={true}
        destroyOnHidden={true}
        className="fixed right-0 top-0 transition-transform duration-300 ease-in-out"
        rootClassName="!absolute !right-0 !top-0"
        style={{ position: 'absolute', right: 0, top: 54 }}
      >
      <div className="h-[calc(100vh-110px)] overflow-y-auto">
          <div className="flex space-x-4 mb-4 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`py-2 px-4 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            {renderTabContent()}
          </div>
        </div>
      </Modal>
    );
  };

  export default SideModal;