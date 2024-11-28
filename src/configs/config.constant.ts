// import fs from "react-native-fs";
// import { _getJson } from "../local-storage";

// export const RECAPCHA_KEY = "smRY9k7cjMACBJSeVEj6E3VgqKe858gnAmBRQQNS";
// export const CACHE_MEDIA_FOLDER = fs.CachesDirectoryPath + "/media/";
// export const CACHE_MEDIA_CHAT_FOLDER = fs.CachesDirectoryPath + "/media_chat/";

// export enum ENVIRONMENT {
//   DEVELOP = "develop",
//   PRODUCT = "product",
// }
// // fb login
// // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDQ3MDU0MjMsImRhdGEiOnsiX2lkIjoiNjYxNzY2YzU1MmM2ODE5MTY2ODdjMjcxIiwia2V5IjoiMGNkNmFkZGMwNmVjOGMzNmNjOTVlYjAxNTUyMjRkNGIiLCJzaWduYXR1cmUiOiJmOTNiOGI2NDkwMmQyM2M0ZDJiZjNhMjUyNzc0NDY3MyIsInNlc3Npb24iOiI2NjFjZTQwZWM4YjM3NTBlZDM0YThjMjIifSwiaWF0IjoxNzEzMTY5NDIzfQ.V9pKUOkg3G-_2hLYRXv-ZQSz_aOd9l6hg6nmdJ_t0fY
// export const isProduction =
//   (_getJson("env") || (__DEV__ ? ENVIRONMENT.DEVELOP : ENVIRONMENT.PRODUCT)) ===
//   ENVIRONMENT.PRODUCT;

// //dev domain api
// const DEVELOPER_DOMAIN_DEV =
//   "https://booking-driver-production.up.railway.app";
// const DEVELOPER_DOMAIN_SOCKET_DEV =
//   "https://booking-driver-production.up.railway.app";

// //prod domain api
// const PRODUCTION_DOMAIN_PRODUCTION =
//   "https://booking-driver-production.up.railway.app";
// const PRODUCTION_DOMAIN_SOCKET_PRODUCTION =
//   "https://booking-driver-production.up.railway.app";

// const DOMAIN = !isProduction
//   ? DEVELOPER_DOMAIN_DEV
//   : PRODUCTION_DOMAIN_PRODUCTION;
// const DOMAIN_API = DOMAIN + "/api/";
// const DOMAIN_SOCKET = !isProduction
//   ? DEVELOPER_DOMAIN_SOCKET_DEV
//   : PRODUCTION_DOMAIN_SOCKET_PRODUCTION;

// export let APP_URL = {
//   APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
//   BASEURL: DOMAIN_API + "",
//   BASEURL_SOCKET: DOMAIN_SOCKET + "/socket",
// };

// export function setUrlEnv(isProduction: boolean) {
//   const DOMAIN = !isProduction
//     ? DEVELOPER_DOMAIN_DEV
//     : PRODUCTION_DOMAIN_PRODUCTION;
//   const DOMAIN_API = DOMAIN + "/api/";
//   const DOMAIN_SOCKET = !isProduction
//     ? DEVELOPER_DOMAIN_SOCKET_DEV
//     : PRODUCTION_DOMAIN_SOCKET_PRODUCTION;
//   APP_URL = {
//     APP_API_REQUEST_TIMEOUT: 15, // in second, NOT microseconds
//     BASEURL: DOMAIN_API + "",
//     BASEURL_SOCKET: DOMAIN_SOCKET + "/socket",
//   };
// }

import fs from "react-native-fs";
import { _getJson } from "../local-storage";

export const RECAPCHA_KEY = "smRY9k7cjMACBJSeVEj6E3VgqKe858gnAmBRQQNS";
export const CACHE_MEDIA_FOLDER = fs.CachesDirectoryPath + "/media/";
export const CACHE_MEDIA_CHAT_FOLDER = fs.CachesDirectoryPath + "/media_chat/";

export enum ENVIRONMENT {
  PRODUCT = "product",
}

// Since we're now using only the production environment, we can hardcode this
export const isProduction = true;

// prod domain api
const PRODUCTION_DOMAIN_PRODUCTION =
  "https://booking-driver-production.up.railway.app";
const PRODUCTION_DOMAIN_SOCKET_PRODUCTION =
  "https://booking-driver-production.up.railway.app";

// As we're using only product, we no longer need to check for environments
const DOMAIN = PRODUCTION_DOMAIN_PRODUCTION;
const DOMAIN_API = DOMAIN + "/api/";
const DOMAIN_SOCKET = PRODUCTION_DOMAIN_SOCKET_PRODUCTION;

export let APP_URL = {
  APP_API_REQUEST_TIMEOUT: 15, // in seconds, NOT microseconds
  BASEURL: DOMAIN_API + "",
  BASEURL_SOCKET: DOMAIN_SOCKET + "/socket",
};

// Remove the setUrlEnv function as we are no longer switching between environments

