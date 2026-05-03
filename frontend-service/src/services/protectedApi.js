import { API_BASE_URL } from "../config.js";
import { requestJson } from "./httpClient.js";

export function getProtectedResource(token) {
  return requestJson(`${API_BASE_URL}/protected`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
