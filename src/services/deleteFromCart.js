import api from "../configs/axiosConfig";

export const deleteFromCart = async (id) => {
  try {
    const res = await api.delete("v1/cart/" + id);

    return [undefined, res.data];
  } catch (e) {
    return [new Error (e.response.data.message), undefined];
  }
};