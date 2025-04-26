import api from "../configs/axiosConfig";

export default async function getClotheApi(id) {
  try {
    const response = await api.get(`/v1/public/clothe/${id}`);

    return [undefined, response.data];
  } catch (error) {
    return [new Error(error.response.data.message)];
  }
}