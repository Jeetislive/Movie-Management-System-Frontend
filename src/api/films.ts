import axiosInstance from "./axiosInterceptor";

const getAllFilms = async (params: { limit: number; orderBy: string; orderType: string; pageNo: number;}) => {
  const response = await axiosInstance.get("/film/list", { params });
  console.log(response.data);
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

export { 
    getAllFilms,
    getMovieDetails,
   getMovieActorDetails,
};
