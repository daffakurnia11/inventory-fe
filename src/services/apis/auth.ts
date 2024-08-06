import { LoginPayload, RegisterPayload } from "@/types/auth";
import * as url from "../urls/auth";
import apiService from "./api-service";

export const LoginService = async (payload: LoginPayload) => {
  return await apiService.post(url.LoginUrl, payload);
}

export const RegisterService = async (payload: RegisterPayload) => {
  return await apiService.post(url.RegisterUrl, payload);
}