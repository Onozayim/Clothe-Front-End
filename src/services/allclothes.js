import api from "../configs/axiosConfig";

export default async function allClothes(page) {
  try {
    const response = await api.get(`/v1/public/clothe?page=${page}`);
    console.log(response);

    return [undefined, response.data];
  } catch (error) {
    return [new Error(error.response.data.message)];
  }
}
