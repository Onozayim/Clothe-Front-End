import api from "../configs/axiosConfig";

export const loginService = async (body) => {
  try {
    const res = await api.post("v1/auth/login", body);

    return [undefined, res.data];
  } catch (e) {
    return [new Error (e.response.data.message), undefined];
  }
};
