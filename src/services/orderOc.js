import api from "../configs/axiosConfig";

export const orderOc = async (id) => {
  try {
    const res = await api.post("v1/oc");

    return [undefined, res.data];
  } catch (e) {
    return [new Error (e.response.data.message), undefined];
  }
};