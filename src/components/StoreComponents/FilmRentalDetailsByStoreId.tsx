  import React, { useEffect, useState } from 'react';
  import { Table, Pagination } from 'antd';
  import { getRentalDetailsByStoreId } from '../../api/store';

  interface FilmRentalDetailsByStoreIdProps {
    storeId: number;
    isOpen: boolean;
  }

  const FilmRentalDetailsByStoreId: React.FC<FilmRentalDetailsByStoreIdProps> = ({ storeId, isOpen }) => {
    const [rentalDetails, setRentalDetails] = useState<{ storeId: number; filmName: string; rentalCount: number; }[]>([]);  
    const [totalRecords, setTotalRecords] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const columns = [
      {
        title: 'Store ID',
        dataIndex: 'storeId',
        key: 'storeId',
      },
      {
        title: 'Film Name',
        dataIndex: 'filmName',
        key: 'filmName',
      },
      {
        title: 'Rental Count',
        dataIndex: 'rentalCount',
        key: 'rentalCount',
      }
    ];

    useEffect(() => {
      if (isOpen && storeId) {
        fetchRentalDetails();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, storeId, currentPage]);

    const fetchRentalDetails = async () => {
      try {
          const params = { storeId, pageNo: currentPage, pageSize };
        const response = await getRentalDetailsByStoreId(params);
      console.log(response.data);
        setRentalDetails(response.data);
        setTotalRecords(response.totalCount);
      } catch (error) {
        console.error('Error fetching rental details:', error);
      }
    };

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    return (
      <div className="w-full p-4">
        <div className="bg-white rounded-lg shadow-md">
          <Table
            dataSource={rentalDetails}
            columns={columns}
            pagination={false}
            rowKey="rental_id"
            className="w-full"
          />
          <div className="flex justify-end p-4">
            <Pagination
              current={currentPage}
              total={totalRecords}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    );
  };

  export default FilmRentalDetailsByStoreId;
