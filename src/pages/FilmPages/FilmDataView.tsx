  import React, { useState, useEffect, useCallback } from 'react';
  import { Table, Select, Space, Pagination } from 'antd';
  import { getAllFilms } from '../../api/films';
  import SideModal from '../../components/FilmComponents/SideModal';

  const { Option } = Select;

  const FilmDataView: React.FC = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [orderBy, setOrderBy] = useState('replacement_cost');
    const [orderType, setOrderType] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<number>(0);

    const columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Release Year',
        dataIndex: 'release_year',
        key: 'release_year',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Length',
        dataIndex: 'length',
        key: 'length',
      },
      {
        title: 'Replacement Cost',
        dataIndex: 'replacement_cost',
        key: 'replacement_cost',
      },
      {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
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
        const response = await getAllFilms(params);
        console.log(response.total);
        setData(response.films);
        setTotalRecords(response.total);
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
      console.log(record.film_id);
      setSelectedFilmId(record.film_id);
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
            <Option value="title">Title</Option>
            <Option value="release_year">Release Year</Option>
            <Option value="length">Length</Option>
            <Option value="replacement_cost">Replacement Cost</Option>
            <Option value="rating">Rating</Option>
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
          rowKey="film_id"
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

        {selectedFilmId > 0 && (
          <SideModal
            isVisible={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedFilmId(0);
            }}
            filmId={selectedFilmId}
          />
        )}
      </div>
    );
  };
  export default FilmDataView;