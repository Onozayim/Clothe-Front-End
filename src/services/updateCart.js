import api from "../configs/axiosConfig";

export const updateFromCart = async (body) => {
  try {
    const res = await api.put("v1/cart", body);

    return [undefined, res.data];
  } catch (e) {
    return [new Error (e.response.data.message), undefined];
  }
};