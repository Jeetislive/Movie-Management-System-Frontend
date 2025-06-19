  import React, { useState } from 'react';
  import { Modal } from 'antd';
  import StoreDetails from './StoreDetails';
  import FilmRentalDetailsByStoreId from './FilmRentalDetailsByStoreId';
  import StaffDetailsByStoreId from './StaffDetailsByStoreId';

  interface SideModalProps {
    isVisible: boolean;
    onClose: () => void;
    storeId: number;
  }

  const tabs = [
    { id: '1', label: 'Store Details' },
    { id: '2', label: 'Film Rental Details' },
    { id: '3', label: 'Staff Details' }
  ];

  const SideModal: React.FC<SideModalProps> = ({ isVisible, onClose, storeId }) => {
    console.log('storeId', storeId);
    const [activeTab, setActiveTab] = useState('1');

    const renderTabContent = () => {
      switch(activeTab) {
        case '1':
          return <StoreDetails storeId={String(storeId)} isOpen={isVisible}/>;
        case '2':
          return <FilmRentalDetailsByStoreId storeId={storeId} isOpen={isVisible}/>;
        case '3':
          return <StaffDetailsByStoreId storeId={storeId} isOpen={isVisible} />;
        default:
          return <StoreDetails storeId={String(storeId)} isOpen={isVisible}/>;
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