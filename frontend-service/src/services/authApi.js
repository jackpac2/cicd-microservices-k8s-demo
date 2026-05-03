import { AUTH_BASE_URL } from "../config.js";
import { requestJson } from "./httpClient.js";

export function registerUser(credentials) {
  return requestJson(`${AUTH_BASE_URL}/register`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function loginUser(credentials) {
  return requestJson(`${AUTH_BASE_URL}/login`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}
