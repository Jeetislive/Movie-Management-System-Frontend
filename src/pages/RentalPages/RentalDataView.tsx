  import React, { useState, useEffect, useCallback } from 'react';
  import { Table, Select, Space, Pagination } from 'antd';
  import { getAllRentals } from '../../api/rentals';
  import SideModal from '../../components/RentalComponents/SideModal';

  const { Option } = Select;

  const RentalDataView: React.FC = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [orderBy, setOrderBy] = useState('store');
    const [orderType, setOrderType] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRentalId, setSelectedRentalId] = useState<number>(0);

    const columns = [
      {
        title: 'Movie Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Customer Name',
        dataIndex: 'customer_name',
        key: 'customer_name',
      },
      {
        title: 'Store',
        dataIndex: 'store_id',
        key: 'store_id',
      },
      {
        title: 'Amount Paid',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Payment Date',
        dataIndex: 'payment_date',
        key: 'payment_date',
      },
      {
        title: 'Rental Duration',
        dataIndex: 'rental_duration',
        key: 'rental_duration',
      },
    ];
    const fetchData = useCallback(async () => {
      setLoading(true);
      try {
        const params = {
          limit: pageSize,
          orderBy,
          orderType,
          pageNo: currentPage,
        };
      console.log(params);
        const response = await getAllRentals(params);
        console.log(response);
      setTotalRecords(response.totalRentals);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedData = response?.rentals?.map((rental: any) => ({
          rental_id: rental.rental_id,
          title: rental.inventory.film.title,
          customer_name: `${rental.customer.first_name} ${rental.customer.last_name}`,
          store_id: rental.inventory.store.store_id,
          amount: rental.payment[0].amount,
          payment_date: new Date(rental.payment[0].payment_date).toLocaleDateString('en-GB'),          
          rental_duration: `${Math.floor((new Date(rental.return_date).getTime() - new Date(rental.rental_date).getTime()) / (1000 * 60 * 60 * 24))} days`,
          totalRecords : response.total
        })) || [];
        setData(formattedData);
    //   setTotalRecords(response.total || 10);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }, [pageSize, orderBy, orderType, currentPage]);
    useEffect(() => {
      fetchData();
    }, [orderBy, orderType, currentPage, fetchData]);

    const handleSortByChange = (value: string) => {
      setOrderBy(value);
      setCurrentPage(1);
    };

    const handleSortTypeChange = (value: string) => {
      setOrderType(value);
      setCurrentPage(1);
    };

    const handlePageSizeChange = (value: number) => {
      setPageSize(value);
      setCurrentPage(1);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRowClick = (record: any) => {
    //   console.log(record.rental_id);
      setSelectedRentalId(record.rental_id);
      setIsModalOpen(true);
    };

    return (
      <div style={{ padding: '24px', marginRight: isModalOpen ? '600px' : '0', transition: 'margin-right 0.3s' }}>
        <Space style={{ marginBottom: '16px' }} size="large">
          <span>Sort by:</span>
          <Select
            defaultValue={orderBy}
            style={{ width: 160 }}
            onChange={handleSortByChange}
          >
            <Option value="store">Store</Option>
            <Option value="customer">Customer</Option>
            <Option value="movie">Movie</Option>
          </Select>
          <span>Order:</span>
          <Select
            defaultValue={orderType}
            style={{ width: 120 }}
            onChange={handleSortTypeChange}
          >
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Select
            defaultValue={pageSize}
            style={{ width: 120 }}
            onChange={handlePageSizeChange}
          >
            <Option value={10}>10 / page</Option>
            <Option value={20}>20 / page</Option>
            <Option value={50}>50 / page</Option>
            <Option value={100}>100 / page</Option>
          </Select>
        </Space>

        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={false}
          rowKey="rental_id"
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
            style: { cursor: 'pointer' }
          })}
        />

        <Pagination
          current={currentPage}
          total={totalRecords}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: '16px', textAlign: 'right' }}
        />

        {selectedRentalId > 0 && (
          <SideModal
            isVisible={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedRentalId(0);
            }}
            rentalId={selectedRentalId}
          />
        )}
      </div>
    );
  };
  export default RentalDataView;