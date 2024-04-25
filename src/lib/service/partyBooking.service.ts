import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import {
  PartyBookingArrayResponse,
  PartyBookingObjectResponse,
} from "@/dtos/response/partyBooking.response";
import {
  BookingRequest,
  BookingUpdateOrganzationTimeRequest,
  BookingUpdatePackage,
} from "@/dtos/request/partyBooking.request";

export const partyBookingService = {
  createPartyBooking: (
    payload: BookingRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/create`;
    return axiosClient.post(url, { ...payload });
  },
  getAllBooking: (): Promise<AxiosResponse<PartyBookingArrayResponse>> => {
    const url = `/api/party-booking/get-all-by-user`;
    return axiosClient.get(url);
  },
  getBookingById: (
    id: number,
  ): Promise<AxiosResponse<PartyBookingObjectResponse>> => {
    const url = `/api/party-booking/get-by-id-for-customer/${id}`;
    return axiosClient.get(url);
  },
  cancelBooking: (id: number): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/cancel-party-booking-for-customer/${id}`;
    return axiosClient.put(url);
  },
  updateOrganizationTime: (
    params: BookingUpdateOrganzationTimeRequest,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/update-organization-time/${params.partyBookingId}?${params.slotInRoomId !== null ? `slotInRoomId=${params.slotInRoomId}` : ""}${params.date !== null ? `&date=${params.date}` : ""}`;
    return axiosClient.put(url);
  },
  updatePackage: (
    params: BookingUpdatePackage,
  ): Promise<AxiosResponse<any>> => {
    const url = `/api/party-booking/update-package/${params.partyBookingId}?${`packageDecoId=${params.packageDecoId}`}&packageFoodId=${params.packageFoodId}`;
    return axiosClient.put(url);
  },
};
