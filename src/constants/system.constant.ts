import { Platform } from "react-native";
import { PERMISSIONS } from "react-native-permissions";
import { Device } from "../utils/device.ui.utils";


const permissionMedia = () => {
  if (Device.isIos)
    return [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
    ];
  if (Number(Platform.Version) >= 33)
    return [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ];
  return [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ];
};
const permissionRecord = () => {
  if (Device.isIos) return [PERMISSIONS.IOS.MICROPHONE];
  if (Number(Platform.Version) >= 33)
    return [
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ];
  return [
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ];
};
const permissionLibrary = () => {
  if (Device.isIos) return [PERMISSIONS.IOS.PHOTO_LIBRARY];
  if (Number(Platform.Version) >= 33) {
    return [
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
    ];
  }

  return [
    PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  ];
};

const permissionRecordVideo = () => {
  if (Device.isIos) return [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE];
  return [
    PERMISSIONS.ANDROID.CAMERA,
    PERMISSIONS.ANDROID.RECORD_AUDIO,
    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
  ];
};

export const PERMISSION = {
  permissionVideoCall: Device.isIos
    ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]
    : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
  permissionMedia: permissionMedia(),
  permissionRecord: permissionRecord(),
  permissionLibrary: permissionLibrary(),
  permissionRecordVideo: permissionRecordVideo(),
  permissionDownload: [PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE],
  permissionCamera: Device.isIos
    ? [PERMISSIONS.IOS.CAMERA]
    : [PERMISSIONS.ANDROID.CAMERA],
  permissionCall: Device.isIos
    ? []
    : [PERMISSIONS.ANDROID.POST_NOTIFICATIONS, PERMISSIONS.ANDROID.CALL_PHONE],
};

export enum EnumRole {
  User = "ROLE_USER",
  Mechanic = "ROLE_MECHANIC",
  Admin = "admin",
}
export enum EnumAppointmentStatus {
  New = "NEW",
  Confirmed = "CONFIRMED",
  Processing = "PROCESSING",
  Completed = "COMPLETED",
  Canceled = "CANCELED"
}
export enum EnumAppointmentType {
  Spa = "SPA",
  Fixed = "FIXED",
  // ...
}

export type TypeAppointmentStatus = 'NEW' | 'CONFIRMED' | 'PROCESSING' | 'COMPLETED' | 'CANCELED';
