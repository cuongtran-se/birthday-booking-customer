import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";
import { LOGIN_PARAM, REGISTER_PARAM } from "@/models/auth.param";
import { REGISTER_RESPONSE, USERINFO_RESPONSE } from "@/dtos/response/auth.response";

export const authService = {
  register: (
    payload: REGISTER_PARAM,
  ): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    const url = "/api/account/register";

    return axiosClient.post(url, { ...payload });
  },
  login: (payload: LOGIN_PARAM): Promise<AxiosResponse<REGISTER_RESPONSE>> => {
    const url = "/api/account/customer/authenticate";

    return axiosClient.post(url, { ...payload });
  },
  loginWithGoogle: (
    accessToken: string,
  ): Promise<AxiosResponse<{ token: string }>> => {
    const url = `/api/account/signin/gmail?accessToken=${accessToken}`;

    return axiosClient.post(url);
  },
  getUserInfo: (): Promise<AxiosResponse<USERINFO_RESPONSE>> => {
    const url = "/api/account/information";

    return axiosClient.get(url);
  },
  updateAvatar: (imgSrc: any): Promise<AxiosResponse<USERINFO_RESPONSE>> => {
    const url = "/api/account/update-img";
    const formData = new FormData();
    formData.append("fileImg", imgSrc);
    return axiosClient.put(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
