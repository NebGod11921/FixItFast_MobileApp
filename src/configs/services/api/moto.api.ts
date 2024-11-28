import request, { METHOD } from "./api";

export interface TypeCreateInfoMoto {
  licensePlate?: string;
  brand?: string;
  color?: string;
  bodyStyle?: string;
  origin?: string;
  machineNumber?: string;
  frameNumber?: string;
  year?: string;
}

export interface TypeCreateInfoMechanic {
  name?: string;
  username?: string;
  address?: string;
  description?: string;
  latiTude?: string;
  longiTude?: string;
}

export async function createMoto(data: TypeCreateInfoMoto) {
  return request({
    method: METHOD.POST,
    urlPath: "user/add-new-moto",
    data,
  }).then((response) => {
    return response;
  });
}

export async function deleleMoto(data: TypeCreateInfoMoto) {
  return request({
    method: METHOD.DELETE,
    urlPath: "user/delete-info-moto",
    data,
  }).then((response) => {
    return response;
  });
}

export async function createMechanic(data: TypeCreateInfoMechanic) {
  return request({
    method: METHOD.POST,
    urlPath: "mechanic/add-new-garage",
    data,
  }).then((response) => {
    return response;
  });
}
