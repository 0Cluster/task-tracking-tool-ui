import { BASE_API_URL } from "../config";

export const login = async (data: any) => {
  return fetch(`${BASE_API_URL}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
