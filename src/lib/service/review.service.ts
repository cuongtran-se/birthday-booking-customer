import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { ReviewArrayResponse } from "@/dtos/response/review.response";

export const reviewService = {
  getAllReview: (request: {
    venueId: number;
    fitler?: { rating?: number | null };
  }): Promise<AxiosResponse<ReviewArrayResponse>> => {
    const url = `/api/review/get-all-reviews/${request.venueId}`;
    return axiosClient.get(url, { params: request.fitler });
  },
  createReview: (request: {
    id: number;
    payload: {
      reviewMessage: string;
      rating: number;
    };
  }): Promise<AxiosResponse<any>> => {
    const url = `/api/review/create/${request.id}`;
    return axiosClient.post(url, { ...request.payload });
  },
};
