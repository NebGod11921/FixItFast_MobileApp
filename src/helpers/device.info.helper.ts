// import { getUniqueId } from "react-native-device-info";
// import { Platform } from "react-native";
// import { _getJson } from "../local-storage";

// interface DeviceInfoType {
//   device_uuid: string;
//   device_type: string;
//   // device_signature: string,
// }

// let deviceInfo: DeviceInfoType = {
//   // Important info need to initted first
//   device_uuid: "",
//   device_type: "",
//   // device_signature: '',
// };

// export function getDeviceInfo() {
//   return { ...deviceInfo, device_signature: _getJson("fcmToken") };
// }

// export async function setDeviceInfo() {
//   deviceInfo = await getDefaultParams();
// }

// async function getDefaultParams() {
//   // const fcmToken = await getFCMToken();
//   const params: DeviceInfoType = {
//     device_uuid: "",
//     device_type: getPlatform(),
//   };

//   params.device_uuid = await getUniqueId();
//   // let deviceName = DeviceInfo.getDeviceName();
//   return params;
// }

// export function getPlatform() {
//   let defaultPlatform = "unknown";
//   if (Platform.OS === "ios") {
//     defaultPlatform = "ios";
//   } else if (Platform.OS === "android") {
//     defaultPlatform = "android";
//   }
//   return defaultPlatform;
// }

// // export function isAndroid() {
// //   return Platform.OS == "android";
// // }


// // export function isIos() {
// //   return Platform.OS == "ios";
// // }

// export function getDeviceId() {
//   return deviceInfo.device_uuid;
// }

import { getUniqueId } from "react-native-device-info";
import { Platform } from "react-native";
import { _getJson } from "../local-storage";

interface DeviceInfoType {
  device_uuid: string;
  device_type: string;
}

let deviceInfo: DeviceInfoType = {
  device_uuid: "",
  device_type: "",
};

export function getDeviceInfo() {
  return { ...deviceInfo };
}

export async function setDeviceInfo() {
  deviceInfo = await getDefaultParams();
}

async function getDefaultParams() {
  const params: DeviceInfoType = {
    device_uuid: "",
    device_type: getPlatform(),
  };

  params.device_uuid = await getUniqueId();
  // let deviceName = DeviceInfo.getDeviceName();
  return params;
}

export function getPlatform() {
  let defaultPlatform = "unknown";
  if (Platform.OS === "ios") {
    defaultPlatform = "ios";
  } else if (Platform.OS === "android") {
    defaultPlatform = "android";
  }
  return defaultPlatform;
}

export function isAndroid() {
  return Platform.OS == "android";
}


export function isIos() {
  return Platform.OS == "ios";
}

export function getDeviceId() {
  return deviceInfo.device_uuid;
}
