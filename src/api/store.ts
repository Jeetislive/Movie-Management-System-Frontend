import axiosInstance from "./axiosInterceptor";

const getAllStores = async () => {
  const response = await axiosInstance.get("/store/list");
  console.log(response.data);
  return response.data;
};

const getRentalDetailsByStoreId = async (params:{storeId: number, pageNo: number, pageSize: number}) => {
  const response = await axiosInstance.get(`/store/${params.storeId}/rentals`, { params });
  return response.data;
};

const getAllStaffDetailsByStoreId = async (storeId: number) => {
  const response = await axiosInstance.get(`/store/${storeId}/staffs`);
  return response.data;
};

const getStoreById = async (storeId: string) => {
  const response = await axiosInstance.get(`/store/${storeId}/info`);
  return response.data;
}

export { 
    getAllStores,
    getStoreById,
    getRentalDetailsByStoreId,
    getAllStaffDetailsByStoreId,
};
