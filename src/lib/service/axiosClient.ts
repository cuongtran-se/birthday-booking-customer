import { APP_CONSTANTS } from "@/enums/app";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use((config: any) => {
  const customHeaders: Record<string, unknown> = {};
  const accessToken = localStorage.getItem(APP_CONSTANTS.ACCESS_TOKEN);
  console.log("<AxiosClient> ACCESSTOKEN: ", accessToken);
  if (accessToken) {
    customHeaders.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log("<AxiosClient> ACCESS TOKEN FAILED!");
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  };
});

// const refreshAuthLogic = async (failedRequest: {
//   response: { config: { headers: { [x: string]: string } } };
// }) => {
//   const refreshToken = await AsyncStorage.getItem(AppConstants.REFRESH_TOKEN);
//   const accessToken = await AsyncStorage.getItem(AppConstants.ACCESS_TOKEN);
//   try {
//     const response = await axiosClient.get("/auth/refresh-token", {
//       headers: {
//         refreshToken: refreshToken ? refreshToken : "",
//         Authorization: `Bearer ${String(accessToken)}`,
//       },
//       skipAuthRefresh: true,
//     } as AxiosAuthRefreshRequestConfig);
//     const { token } = response.data;
//     await AsyncStorage.setItem(AppConstants.ACCESS_TOKEN, token);
//     failedRequest.response.config.headers.Authorization = `Bearer ${String(
//       token,
//     )}`;
//     return await Promise.resolve();
//   } catch (error) {
//     AsyncStorage.removeItem(AppConstants.REFRESH_TOKEN);
//     AsyncStorage.removeItem(AppConstants.ACCESS_TOKEN);
//     return await Promise.reject(error);
//   }
// };

// createAuthRefreshInterceptor(axiosClient, refreshAuthLogic);

// HOW TO CALL EXTERNAL API

// const getExternalApi = () => {
//   const url = '/resource-name';
//   const config = {
//     baseURL: 'https://your-new-base-api-url.com/api',
//     headers: {
//       Authorization: 'your-new-token-to-use-in-new-api',
//     },
//   };

//   return axiosClient.get(url, config);
// };

export default axiosClient;
