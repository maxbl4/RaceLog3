import { CMSResponse } from "./cms.api";
import {
  MESH_API_LOGIN,
  MESH_API_LOGOUT,
  MESH_API_ABOUT_ME,
  getServerURL,
  MESH_API_USERS
} from "../utils/constants";
import { LoggingService } from "../utils/logging-service";
import { UserInfo } from "../types/datatypes";

type HeaderField = {
  name: string;
  value: string;
};

export async function meshLogin(userName: string, userPassword: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_LOGIN, "GET", [
    { name: "Authorization", value: "Basic " + btoa(`${userName}:${userPassword}`) }
  ]);
}

export async function meshLogout(token: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_LOGOUT, "GET", [
    { name: "Authorization", value: `Bearer ${token}` }
  ]);
}

export async function meshAboutMe(token: string): Promise<CMSResponse> {
  return executeQuery(MESH_API_ABOUT_ME, "GET", [
    { name: "Authorization", value: `Bearer ${token}` }
  ]);
}

export async function meshRegister(userInfo: UserInfo): Promise<CMSResponse> {
  return executeQuery(MESH_API_USERS, "POST", [{ name: "Content-Type", value: "application/json" }], {
    username: userInfo.email,
    password: userInfo.password,
    firstname: userInfo.name,
    emailAddress: userInfo.email
  });
}

export async function executeQuery(
  apiPath: string,
  method: string,
  headerFields: HeaderField[],
  body?: any
): Promise<CMSResponse> {
  const headers = new Headers();
  headerFields.forEach(field => headers.append(field.name, field.value));

  const request = new Request(getServerURL() + apiPath, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined
  });

  LoggingService.getInstance().info(
    `Sending request: ${JSON.stringify({
      url: request.url,
      method: request.method,
      headers: JSON.stringify(headerFields),
      body: JSON.stringify(body)
    })}`
  );

  const response: Response = await fetch(request);
  const jsonResponse = await response.json();

  LoggingService.getInstance().info(`Response received: ${JSON.stringify(jsonResponse)}`);

  return new Promise<CMSResponse>(resolve =>
    resolve({
      success: response.ok,
      body: jsonResponse
    })
  );
}
