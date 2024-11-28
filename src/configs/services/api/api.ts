import { _getJson, USER_TOKEN } from "@/src/local-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";

export const BASEURL = "https://booking-driver-api.up.railway.app/api/";

export const UPLOAD_URL = "https://booking-driver-api.up.railway.app/api/";

export const METHOD = {
  GET: "GET",
  POST: "POST",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const headersDefault = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
};

interface RequestOption extends AxiosRequestConfig {
  requestTime?: number;
  retry?: boolean;
}

export const apiClient = axios.create({
  timeout: 20000,
  headers: headersDefault,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async function (config) {
    const userToken = await AsyncStorage.getItem(USER_TOKEN);
    if (userToken) config.headers.Authorization = `Bearer ${userToken}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject({ ...error, isError: true });
  },
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message: string = error?.response?.data?.message;
    return Promise.reject({ ...error, message, isError: true });
  },
);

interface IRequest {
  url?: string;
  urlPath?: string;
  params?: any;
  data?: any;
  method?: string;
  option?: RequestOption;
  customHeader?: Headers;
  onUploadProgress?: any;
}

export default function request({
  params,
  url,
  urlPath,
  data,
  method,
  option,
  customHeader,
  onUploadProgress,
}: IRequest) {
  return apiClient
    .request({
      method: method || METHOD.POST,
      url: url || BASEURL + urlPath,
      params,
      data,
      ...option,
      headers: customHeader || headersDefault,
      onUploadProgress: onUploadProgress ? onUploadProgress : () => {},
    })
    .catch((error) => {
      return Promise.resolve({ ...error, isError: true });
    });
}
