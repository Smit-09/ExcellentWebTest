import axiosClient from "../axiosClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const loginUser = async (payload: LoginPayload): Promise<UserResponse> => {
  const { data } = await axiosClient.post("/api/auth/login", payload);
  return data;
};