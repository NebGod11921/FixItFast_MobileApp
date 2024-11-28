import axios from "axios";
import request, { METHOD } from "./api";
import {
  EnumAppointmentStatus,
  TypeAppointmentStatus,
} from "@/src/constants/system.constant";

export type TypeParamsRequestAppointmentUser = {
  limit: string;
  user_id: number | string;
  status: TypeAppointmentStatus;
};

export type TypeParamsCreatePayment = {
  orderCode: number;
  amount: string;
  description: string;
  cancelUrl: string;
  returnUrl: string;
};

export interface TypeCreateAppointment {
  motorbikeSpareParts?: string;
  description?: string;
  type?: string;
  appointmentDate?: string;
  address?: string; 
}

export async function createNewAppointment(data: TypeCreateAppointment) {
  try {
    const response = await request({
      method: METHOD.POST,
      urlPath: "user/create-new-appointment",
      data,
    });

    return response;
  } catch (error) {
    console.error("Error creating new appointment:", error);
  }
}

export async function cancelAppointment(id: number) {
  try {
    const response = await axios.post(
      `https://booking-driver-api.up.railway.app/api/mechanic/${id}/canceled`,
    );
    return response;
  } catch (error) {
    console.error("Error canceling appointment:", error);
    throw error;
  }
}

export async function acceptAppointment(id: number) {
  try {
    const response = await request({
      method: METHOD.POST,
      urlPath: `mechanic/${id}/confirm-appointment`,
    });
    return response;
  } catch (error) {
    console.error("Error accept appointment", error);
  }
}

export async function processingAppointment(id: number, params: any) {
  try {
    const response = await request({
      method: METHOD.POST,
      urlPath: `mechanic/${id}/send-repair-quote`,
      data: params,
    });
    return response;
  } catch (error) {
    console.error("Error accept appointment", error);
  }
}

export async function completedAppointment(id: number) {
  try {
    const response = await request({
      method: METHOD.POST,
      urlPath: `mechanic/${id}/confirm-payment`,
    });
    return response;
  } catch (error) {
    console.error("Error accept appointment", error);
  }
}

export async function getAllListAppointmentUser(params: any) {
  const searchParams = new URLSearchParams(params);
  return request({
    method: METHOD.GET,
    urlPath: "user/get-all-request-ticket",
    params,
  }).then((response) => {
    return response;
  });
}

export async function getAllListAppointmentMechanic(params: any) {
  return request({
    method: METHOD.GET,
    urlPath: "mechanic/get-all-request-ticket",
    params,
  }).then((response) => {
    return response;
  });
}

export async function getAllMechanic(params: any) {
  try {
    const response = await request({
      method: METHOD.GET,
      urlPath: "user/find-mechanic-in-radius",
      params,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function createPayment(data: TypeParamsCreatePayment) {
  try {
    const response = await axios.post(
      `https://api-hrm-production.up.railway.app/create-payment`,
      data,
    );
    return response;
  } catch (error) {
    console.error("Error create payment:", error);
    throw error;
  }
}

export async function getStatusPayment(id: number) {
  try {
    const response = await axios.get(
      `https://api-hrm-production.up.railway.app/get-status-order/${id}`,
    );
    return response;
  } catch (error) {
    console.error("Error create payment:", error);
    throw error;
  }
}