import api from "../configs/axiosConfig";

export const registerService = async (body) => {
  try {
    const res = await api.post("v1/auth/register", body);

    return [undefined, res.data];
  } catch (e) {
    console.log(e);
    return [
      e.response.data?.data?.errors || e.response.data?.message,
      undefined,
    ];
  }
};
