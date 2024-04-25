import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

export const paymentService = {
  createPaymentByBookingId: (id: number): Promise<AxiosResponse<string>> => {
    const url = `/api/payment/payment-vnpay?bookingId=${id}&paymentMethodId=${1}`;
    return axiosClient.post(url);
  },
};
