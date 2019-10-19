import { CMSResponse } from "./cms.api";
import {
  MESH_API_LOGIN,
  MESH_API_LOGOUT,
  MESH_API_ABOUT_ME,
  getServerURL
} from "../utils/constants";

export async function meshLogin(userName: string, userPassword: string): Promise<CMSResponse> {
  return meshSimpleGET(
    MESH_API_LOGIN,
    "authorization",
    "Basic " + btoa(`${userName}:${userPassword}`)
  );
}

export async function meshLogout(token: string): Promise<CMSResponse> {
  return meshSimpleGET(MESH_API_LOGOUT, "Authorization", `Bearer ${token}`);
}

export async function meshAboutMe(token: string): Promise<CMSResponse> {
  return meshSimpleGET(MESH_API_ABOUT_ME, "Authorization", `Bearer ${token}`);
}

export async function meshSimpleGET(
  apiPath: string,
  headerName: string,
  headerValue: string
): Promise<CMSResponse> {
  const headers = new Headers();
  headers.append(headerName, headerValue);

  const request = new Request(getServerURL() + apiPath, {
    method: "GET",
    headers: headers
  });
  const res: Response = await get(request);
  return new Promise<CMSResponse>(resolve =>
    resolve({
      success: res.ok,
      body: JSON.stringify(res)
    })
  );
}

const get = async (path: any): Promise<Response> => {
  const response = await fetch(path);
  return response;
};
