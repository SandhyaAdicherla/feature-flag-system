import api from "./api";

export const loginUser = async (data) => {
    console.log("servise",data)
  const response = await api.post("/super-admin/login", data);
  return response.data;
};