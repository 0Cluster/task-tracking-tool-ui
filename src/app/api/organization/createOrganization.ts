import { BASE_API_URL } from "../config";

export const createOrganization = async (data: any) => {
  return fetch(`${BASE_API_URL}/api/user/organization/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });
};
