// import { MMKV } from "react-native-mmkv";

// export const LocalStorage = new MMKV();

// export const USER_TOKEN = "userToken";

// export const _getJson = (key: string) => {
//   const data: string = LocalStorage.getString(key) || "";
//   return !data ? null : JSON.parse(data);
// };

// export const _setJson = (key: string, value: any) => {
//   LocalStorage.set(key, JSON.stringify(value));
// };

import AsyncStorage from "@react-native-async-storage/async-storage";

export const USER_TOKEN = "userToken";

export const _getJson = async (key: string) => {
  const stringValue = await AsyncStorage.getItem(key);
  return stringValue ? JSON.parse(stringValue) : null;
};

export const _setJson = async (key: string, value: any) => {
  await AsyncStorage.setItem(key, value);
};
