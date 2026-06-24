import api from "./api";

export const createFeature = async (featureData) => {
  const response = await api.post("/features", featureData);
  return response.data;
};

export const getFeatures = async (organizationId) => {
  const response = await api.get(`/features/${organizationId}`);
  return response.data;
};

export const deleteFeature = async (id) => {
  const response = await api.delete(`/features/${id}`);
  return response.data;
};

export const updateFeature = async (id, data) => {
  const response = await api.put(`/features/${id}`, data);
  return response.data;
};

export const checkFeature = async (organizationId, featureKey) => {
  const response = await api.post("/features/check", {
    organizationId,
    featureKey,
  });

  return response.data;
};