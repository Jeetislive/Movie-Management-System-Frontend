  import React, { useEffect, useState } from 'react';
  import { Table } from 'antd';
  import { getAllStores } from '../../api/store';
  import SideModal from '../../components/StoreComponents/SideModal';

  const DataView: React.FC = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedStore, setSelectedStore] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchStores = async () => {
      setLoading(true);
      try {
        const response = await getAllStores();
        console.log(response);
        setStores(response);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchStores();
    }, []);

    const columns = [
      {
        title: 'Store ID',
        dataIndex: 'storeId',
        key: 'storeId',
      },
      {
        title: 'Manager',
        dataIndex: 'manager',
        key: 'manager',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Staff Count',
        dataIndex: 'staffCount',
        key: 'staffCount',
      },
      {
        title: 'Total Rentals',
        dataIndex: 'totalRentals',
        key: 'totalRentals',
      }
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = (record: any) => {
      console.log(record.storeId);
      setSelectedStore(record.storeId);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setSelectedStore(null);
    };

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        handleCloseModal();
      }
    };

    return (
      <div className="relative">
        <div id="storeTable" className={`transition-all ${isModalOpen ? 'mr-96' : 'mr-0'} duration-300 ease-in-out`}>
          <Table
            columns={columns}
            dataSource={stores}
            loading={loading}
            pagination={{
              total: 2,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              className: 'cursor-pointer hover:bg-gray-50'
            })}
            className="w-full"
          />
        </div>
      
        {selectedStore && (
          <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg" onClick={handleOutsideClick}>
            <SideModal
              storeId={selectedStore}
              onClose={handleCloseModal}
              isVisible={isModalOpen}
            />
          </div>
        )}
      </div>
    );
  };  export default DataView;