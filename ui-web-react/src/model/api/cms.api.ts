import { meshLogin, meshLogout, meshAboutMe } from "./mesh.api";
import * as Cookies from "js-cookie";
import { COOKIE_MESH_TOKEN, DEFAULT_TIMEOUT } from "../utils/constants";
import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import { DEFAULT_USER_INFO } from "../utils/test.utils";
import { timeout } from "promise-timeout";

export type CMSResponse = {
  success: boolean;
  body: any;
  rejectReason?: string;
};

export async function login(userName: string, userPassword: string): Promise<any> {
  return timeout(loginImpl(userName, userPassword), DEFAULT_TIMEOUT);
}

async function loginImpl(userName: string, userPassword: string): Promise<any> {
  const res = await meshLogin(userName, userPassword);
  return new Promise<string>((resolve, reject) => {
    if (res.success) {
      Cookies.set(COOKIE_MESH_TOKEN, res.body.token);
      resolve();
    } else {
      Cookies.remove(COOKIE_MESH_TOKEN);
      reject(res.rejectReason);
    }
  });
}

export async function logout(): Promise<any> {
  return timeout(logoutImpl(), DEFAULT_TIMEOUT);
}

async function logoutImpl(): Promise<any> {
  const token = Cookies.get(COOKIE_MESH_TOKEN);
  if (token) {
    const res = await meshLogout(token);
    return new Promise<string>((resolve, reject) => {
      if (res.success) {
        Cookies.remove(COOKIE_MESH_TOKEN);
        resolve();
      } else {
        reject(res.rejectReason);
      }
    });
  } else {
    return new Promise<any>(resolve => resolve());
  }
}

export async function aboutMe(): Promise<Optional<UserInfo>> {
  return timeout(aboutMeImpl(), DEFAULT_TIMEOUT);
}

async function aboutMeImpl(): Promise<Optional<UserInfo>> {
  const token = Cookies.get(COOKIE_MESH_TOKEN);
  if (token) {
    const res = await meshAboutMe(token);
    return new Promise<Optional<UserInfo>>((resolve, reject) => {
      if (res.success) {
        console.log(JSON.stringify(res.body));
        resolve(
          Optional.of<UserInfo>({
            ...DEFAULT_USER_INFO,
            ...res.body
          })
        );
      } else {
        reject(res.rejectReason);
      }
    });
  }
  return new Promise<Optional<UserInfo>>(resolve => resolve(Optional.empty<UserInfo>()));
}