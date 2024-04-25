import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  ServiceArrayResponse,
  ServiceObjectResponse,
} from "@/dtos/response/service.response";

export const serviceService = {
  getAllService: (id: number): Promise<AxiosResponse<ServiceArrayResponse>> => {
    const url = `/api/services/getAll-service-for-customer-by-venue/${id}`;
    return axiosClient.get(url);
  },
  getServiceById: (params: {
    venueId: number;
    serviceId: number;
  }): Promise<AxiosResponse<ServiceObjectResponse>> => {
    const url = `/api/services/getId-service-by-id-for-customer/${params.venueId}/${params.serviceId}`;
    return axiosClient.get(url);
  },
  createService: (payload: any): Promise<AxiosResponse<any>> => {
    const url = `/api/services/create-service`;
    return axiosClient.post(url, { ...payload });
  },
  updateService: (request: {
    id: number;
    payload: {
      serviceName: string;
      serviceImgUrl: string;
      pricing: number;
    };
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/services/update-service/${request.id}`;
    return axiosClient.put(url, { ...request.payload });
  },
  deleteService: (id: number): Promise<AxiosResponse<any>> => {
    const url = `/api/services/update-service/${id}`;
    return axiosClient.delete(url);
  },
};
