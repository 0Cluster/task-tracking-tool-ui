import { BASE_API_URL } from "../config";

export const signup = async (data: any) => {
  return fetch(`${BASE_API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
