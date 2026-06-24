import api from "./api";

export const checkFeature = async (
  organizationId,
  featureKey
) => {
  const response = await api.post(
    "/features/check",
    {
      organizationId,
      featureKey,
    }
  );

  return response.data;
};