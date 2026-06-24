import api from "./api";

export const getOrganizations = async () => {
  const response = await api.get("/organizations");
  return response.data;
};