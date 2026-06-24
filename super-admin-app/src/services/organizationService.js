import api from "./api";

export const getOrganizations = async () => {
  const response = await api.get("/organizations");
  return response.data;
};

export const createOrganization = async (data) => {
  const response = await api.post("/organizations", data);
  return response.data;
};

export const deleteOrganization = async (id) => {
  const response = await api.delete(`/organizations/${id}`);
  return response.data;
};