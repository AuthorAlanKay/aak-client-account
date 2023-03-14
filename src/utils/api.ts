// account

import { ACCOUNT_SERVER } from "./reuse-utils/enum";
import { getFetch, postFetch } from "./reuse-utils/tool";

export const getAccount = async (email: string) =>
  await getFetch(ACCOUNT_SERVER + "/account/get-account/" + email);

export interface ILoginDTO {
  email: string;
  password: string;
}

export const login = async (bodyObject: ILoginDTO) =>
  await postFetch(ACCOUNT_SERVER + "/account/login", bodyObject);

export interface IForgotPasswordDTO {
  email: string;
}

export const forgotPassword = async (bodyObject: IForgotPasswordDTO) =>
  await postFetch(ACCOUNT_SERVER + "/account/forgot-password", bodyObject);

export const verifyForgotPassword = async (captcha: string) =>
  await getFetch(ACCOUNT_SERVER + "/account/verify-forgot-password/" + captcha);

export interface IResetPasswordDTO {
  email: string;
  password: string;
}

export const resetPassword = async (bodyObject: IResetPasswordDTO) =>
  await postFetch(ACCOUNT_SERVER + "/account/reset-password", bodyObject);

export interface ILogoutDTO {
  email: string;
}

export const logout = async (bodyObject: ILogoutDTO) =>
  await postFetch(ACCOUNT_SERVER + "/account/logout", bodyObject);

export interface IRegisterDTO {
  username: string;
  email: string;
  password: string;
}

export const register = async (bodyObject: IRegisterDTO) =>
  await postFetch(ACCOUNT_SERVER + "/account/register", bodyObject);

export const verifyRegister = async (captcha: string) =>
  await getFetch(ACCOUNT_SERVER + "/account/verify-register/" + captcha);

// document

export interface IInitDocumentDTO {
  email: string;
  collection: string;
}

export const initDocument = async (bodyObject: IInitDocumentDTO) =>
  await postFetch(ACCOUNT_SERVER + "/document/init-document", bodyObject);
