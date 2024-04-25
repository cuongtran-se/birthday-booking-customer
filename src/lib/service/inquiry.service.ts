import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  InquiryArrayResponse,
  InquiryObjectResponse,
} from "@/dtos/response/inquiry.response";

export const inquiryService = {
  getAllInquiryByAuthor: (): Promise<AxiosResponse<InquiryArrayResponse>> => {
    const url = "/api/inquiry/get-all-question";
    return axiosClient.get(url);
  },
  getInquiryById: (
    id: number,
  ): Promise<AxiosResponse<InquiryObjectResponse>> => {
    const url = `/api/inquiry/get-question-by-id/${id}`;
    return axiosClient.get(url);
  },
  createInquiry: (payload: {
    inquiryQuestion: string;
  }): Promise<AxiosResponse<any>> => {
    const url = "/api/inquiry/create-question";
    return axiosClient.post(url, { ...payload });
  },
  createInquiryForChangeThemeInVenue: (payload: {
    bookingId: number;
    themeInVenueId: number;
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/inquiry/create-inquiry-for-change-theme-in-venue?bookingId=${payload.bookingId}&themeInVenueId=${payload.themeInVenueId}`;
    return axiosClient.post(url);
  },
  createInquiryForChangePackageInVenue: (payload: {
    bookingId: number;
    packageInVenueId: number;
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/inquiry/create-inquiry-for-change-package-in-venue?bookingId=${payload.bookingId}&packageInVenueId=${payload.packageInVenueId}`;
    return axiosClient.post(url);
  },
  updateInquiry: (request: {
    id: number;
    payload: { inquiryQuestion: string };
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/inquiry/update-question/${request.id}`;
    return axiosClient.put(url, { ...request.payload });
  },
  deleteInquiry: (id: number): Promise<AxiosResponse<any>> => {
    const url = `/api/inquiry/delete-question/${id}`;
    return axiosClient.delete(url);
  },
};
