import { log } from 'console';
import {
  ICreateNewPass,
  ILogin,
  IRequestNewPass,
  ISignUp,
  IVerifyCode,
} from "@/src/models";
import request, { METHOD } from "./api";

export async function getCurrentUser() {
  return request({
    method: METHOD.GET,
    urlPath: "auth/info",
  }).then((response) => {
    return response;
  });
}

export async function loginWithPass(data: ILogin) {
  return request({
    method: METHOD.POST,
    urlPath: "auth/login",
    data,
  }).then((response) => {
    return response;
  });
}

export async function signUp(data: ISignUp) {
  return request({
    method: METHOD.POST,
    urlPath: "auth/register",
    data,
  }).then((response) => {
    return response;
  });
}

export async function updateProfile(data: any) {
  return request({
    method: METHOD.POST,
    urlPath: "auth/upgrade-info",
    data,
  }).then((response) => {
    return response;
  });
}

export async function requestMechanic(data: any) {
  return request({
    method: METHOD.POST,
    urlPath: "user/request-upgrade-become-mechanic",
    data,
  }).then((response) => {
    return response;
  });
}

export async function requestNewPassWithEmail(data: IRequestNewPass) {
  return request({
    method: METHOD.POST,
    urlPath: "auth/forgot-password",
    data,
  }).then((response) => {
    return response;
  });
}

export async function verifyCode(data: IVerifyCode) {
  return request({
    method: METHOD.POST,
    urlPath: "auth/verify-otp",
    data,
  }).then((response) => {    
    return response;
  });
}

export async function createNewPass(data: ICreateNewPass) {
  return request({
    method: METHOD.PATCH,
    urlPath: "auth/reset-password",
    data,
  }).then((response) => {
    return response;
  });
}

export async function beComeMechanic(data: any) {
  return request({
    method: METHOD.POST,
    urlPath: "user/request-upgrade-become-mechanic",
    data,
  }).then((response) => {
    return response;
  });
}
