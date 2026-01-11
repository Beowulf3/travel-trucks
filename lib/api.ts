import { Camper } from '@/types/camper';
import axios from 'axios';

const BASE_URL = 'https://travel-trucks-backend-gv9o.onrender.com';
axios.defaults.baseURL = BASE_URL;
export interface FetchCampersParams {
  page: number;
  limit: number;
}
export interface FetchCampersResponse {
  total: number;
  items: Camper[];
}

export const getAllCampers = async ({
  page,
  limit,
}: FetchCampersParams): Promise<FetchCampersResponse> => {
  const response = await axios.get<FetchCampersResponse>('/campers', {
    params: { page, limit },
  });
  return response.data;
};

export const getCamperById = async (id: string): Promise<Camper> => {
  const response = await axios.get<Camper>(`/campers/${id}`);
  return response.data;
};
