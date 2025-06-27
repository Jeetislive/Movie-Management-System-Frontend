  import React, { useState, useEffect, useCallback } from 'react';
  import { Table, Select, Space, Pagination, Input } from 'antd';
  import { getAllFilms, getFilterDetails } from '../../api/films';
  import SideModal from '../../components/FilmComponents/SideModal';


  const { Option } = Select;

  const FilmDataView: React.FC = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [orderBy, setOrderBy] = useState('title');
    const [orderType, setOrderType] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilmId, setSelectedFilmId] = useState<number>(0);
    const [filterOptions, setFilterOptions] = useState({
      categories: [],
      languages: [],
      actors: [],
      years: [],
      lengths: []
    });
    const [filters, setFilters] = useState({
      category: [],
      language: [],
      release_year: [],
      length: {
        type: '',
        value: ''
      },
      actor: []
    });

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
          pageSize,
          orderBy,
          orderType,
          pageNo: currentPage,
          filtersCategory: filters.category.join(','),
          filtersLanguage: filters.language.join(','),
          filtersRelease_year: filters.release_year.join(','),
          filtersLength_type: filters.length.type,
          filtersLength_value: filters.length.value,
          filtersActor: filters.actor.join(','),
        };
        const response = await getAllFilms(params);
        console.log(response.total);
        setData(response.films);
        setTotalRecords(response.total);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    }, [pageSize, orderBy, orderType, currentPage, filters]);

    const fetchFilterDetails = useCallback(async () => {
      try {
        const response = await getFilterDetails();
        setFilterOptions({
          categories: response.categories,
          languages: response.languages,
          actors: response.actors,
          years: response.years,
          lengths: response.lengths
        });
      } catch (error) {
        console.error('Error fetching filter details:', error);
      }
    }, []);

    useEffect(() => {
      fetchFilterDetails();
    }, [fetchFilterDetails]);

    useEffect(() => {
      fetchData();
    }, [orderBy, orderType, currentPage, filters, fetchData]);

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

    const handleFilterChange = (type: string, value: string[] | { type: string; value: string }) => {
      setFilters(prev => ({
        ...prev,
        [type]: value
      }));
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
        <Space style={{ marginBottom: '16px' }} size="large" wrap>
          <Space>
            <span>Category:</span>
            <Select
              mode="multiple"
              value={filters.category}
              style={{ width: 160 }}
              onChange={(value) => handleFilterChange('category', value)}
            >
              {filterOptions.categories.map((category: { name: string }) => (
                <Option key={category.name} value={category.name.toLowerCase()}>{category.name}</Option>
              ))}
            </Select>
          </Space>

          <Space>
            <span>Language:</span>
            <Select
              mode="multiple"
              value={filters.language}
              style={{ width: 160 }}
              onChange={(value) => handleFilterChange('language', value)}
            >
              {filterOptions.languages.map((language: { name: string }) => (
                <Option key={language.name} value={language.name.toLowerCase()}>{language.name}</Option>
              ))}
            </Select>
          </Space>

          <Space>
            <span>Release Year:</span>
            <Select
              mode="multiple"
              value={filters.release_year}
              style={{ width: 160 }}
              onChange={(value) => handleFilterChange('release_year', value)}
            >
            {filterOptions.years.map((year: { release_year: string }) => (
                <Option key={year.release_year} value={year.release_year}>{year.release_year}</Option>
              ))}
            </Select>
          </Space>

          <Space>
            <span>Length:</span>
            <Select
              value={filters.length.type}
              style={{ width: 120 }}
              onChange={(value) => handleFilterChange('length', { ...filters.length, type: value })}
            >
              <Option value="">No Filter</Option>
              <Option value="gt">Greater Than</Option>
              <Option value="lt">Less Than</Option>
            </Select>
            {filters.length.type && (
              <Input
                style={{ width: 100 }}
                value={filters.length.value}
                onChange={(e) => handleFilterChange('length', { ...filters.length, value: e.target.value })}
                placeholder="Minutes"
              />
            )}
          </Space>

          <Space>
            <span>Actor:</span>
            <Select
              mode="multiple"
              value={filters.actor}
              style={{ width: 160 }}
              onChange={(value) => handleFilterChange('actor', value)}
            >
              {filterOptions.actors.map((actor: { first_name: string; last_name: string }) => (
                <Option key={`${actor.first_name} ${actor.last_name}`} value={`${actor.first_name} ${actor.last_name}`}>
                  {`${actor.first_name} ${actor.last_name}`}
                </Option>
              ))}
            </Select>
          </Space>

          <Space>
            <span>Sort by:</span>
            <Select
              value={orderBy}
              style={{ width: 160 }}
              onChange={handleSortByChange}
            >
              <Option value="title">Title</Option>
              <Option value="release_year">Release Year</Option>
              <Option value="length">Length</Option>
              <Option value="replacement_cost">Replacement Cost</Option>
              <Option value="rating">Rating</Option>
            </Select>
          </Space>

          <Space>
            <span>Order:</span>
            <Select
              value={orderType}
              style={{ width: 120 }}
              onChange={handleSortTypeChange}
            >
              <Option value="asc">Ascending</Option>
              <Option value="desc">Descending</Option>
            </Select>
          </Space>

          <Select
            value={pageSize}
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
          showSizeChanger={false}
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