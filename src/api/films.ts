import axiosInstance from "./axiosInterceptor";

const getAllFilms = async (params: { 
  pageSize: number; 
  orderBy: string; 
  orderType: string; 
  pageNo: number;
  filtersCategory: string;
  filtersLanguage: string;
  filtersRelease_year: string;
  filtersLength_type: string;
  filtersLength_value: string;
  filtersActor: string;
}) => {
  const response = await axiosInstance.get("/film/list", { params });  console.log(response.data);
  return response.data;
};

const getMovieDetails = async (filmId: string) => {
  const response = await axiosInstance.get(`/film/${filmId}/info`);
  return response.data;
};

const getMovieActorDetails = async (filmId: string) => {
  const response = await axiosInstance.get(`/film/${filmId}/actors`);
  return response.data;
};

const getFilterDetails = async () => {
  const response = await axiosInstance.get("/film/filters");
  console.log(response.data);
  return response.data;
};

export { 
    getAllFilms,
    getMovieDetails,
   getMovieActorDetails,
   getFilterDetails
};
