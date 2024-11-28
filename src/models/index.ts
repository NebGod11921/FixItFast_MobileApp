import { EnumAppointmentStatus, EnumAppointmentType, EnumRole } from "../constants/system.constant";

export interface ILogin {
  username?: string;
  // device_type: string;
  // device_uuid: string;
  password: string;
  deviceToken: string;
  // "device_signature": "112667336037344462475"
}

export interface ISignUp {
  name?: string;
  email?: string;
  phone?: string;
  // device_type: string;
  // device_uuid: string;
  password: string;
  confirmPassword: string;
  role: string;
  // "device_signature": "112667336037344462475"
}

export interface IRequestNewPass {
  email?: string;
  // password: string;
  // confirmedPassword: string;
  // otp: string;
}
export interface IVerifyCode {
  email: string;
  otp: string;
  type: string;
}
export interface ICreateNewPass {
  otp: string;
  newPassword: string;
  confirmedPassword: string;
}

export interface Imoto {
  id?: string;
  licensePlate?: string;
  brand?: string;
  color?: string;
  bodyStyle?: string;
  carImage?: string;
  origin?: string;
  machineNumber?: string;
  frameNumber?: string;
  year?: string;
}

export interface TypedUser {
  id?: string;
  phone?: string;
  name?: string;
  password?: string;
  email?: string;
  isLocked?: string;
  isAcitve?: string;
  address?: string;
  imageUrl?: string;
  garage?: string;
  moto?: Imoto;
  roleName?: EnumRole;
}

export interface TypedCropImage {
  creationDate?: string;
  cropRect?: any;
  data?: any;
  duration?: any;
  exif?: any;
  filename?: string;
  fileName?: string;
  height?: number;
  localIdentifier?: string;
  mime?: string;
  modificationDate?: any;
  path?: string;
  size?: number;
  sourceURL?: string;
  width?: number;
  type?: string;
  uri?: string;
}

export type TypeGarage = {
  address: string,
  description?: string,
  distance?: string,
  id: number,
  latiTude?: number,
  longiTude?: number,
  mechanicId?: number,
  name?: string,
  username?: EnumRole;
}

export type TypeDriver = {
  address?: string,
  email?: string,
  garage?: TypeGarage,
  id: number,
  imageUrl?: string,
  isActive: boolean,
  isLocked?: boolean,
  isMechanic?: boolean,
  moto: Imoto,
  name?: string,
  phone?: string,
  roleName?: EnumRole;
}

export type TypeMechanic = {
  address?: string,
  email?: string,
  garage: TypeGarage,
  id: number,
  imageUrl?: string,
  isActive: boolean,
  isLocked: boolean,
  isMechanic: boolean,
  moto?: Imoto,
  name?: string,
  phone?: string,
  roleName?: EnumRole;
}

export type TypeAppointment = {
  appointmentTime?: string,
  description?: string,
  driver: TypeDriver,
  id: number,
  mechanic: TypeMechanic,
  motorbikeSpareParts?: string,
  paymentType?: string,
  price?: number,
  status: EnumAppointmentStatus,
  type: EnumAppointmentType,
}

export type TypeAppointmentByStatus = {
  NEW: TypeAppointment[],
  CONFIRMED: TypeAppointment[],
  PROCESSING: TypeAppointment[],
  COMPLETED: TypeAppointment[],
  CANCELED: TypeAppointment[],
}