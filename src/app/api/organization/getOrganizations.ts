import { BASE_API_URL } from "../config";

export const getOrganizations = async () => {
  return fetch(`${BASE_API_URL}/api/user/organization`, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
