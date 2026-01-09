import { Camper } from '@/types/camper';
import axios from 'axios';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';
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
