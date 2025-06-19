import axiosInstance from "./axiosInterceptor";

const getAllRentals = async (params :{
          limit: number,
          orderBy : string,
          orderType: string;
          pageNo: number,
        }) => {
  const response = await axiosInstance.get("/rental/list", { params });;
    return response.data;
}
const getRentalDetailsById = async (rentalId: number) => {
  const response = await axiosInstance.get(`/rental/${rentalId}/info`);
  return response.data;
};

export {
    getAllRentals,
    getRentalDetailsById
};