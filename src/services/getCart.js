import api from "../configs/axiosConfig";

export default async function getCartService() {
  try {
    console.log(api.defaults.headers.common["Authorization"]);
    const response = await api.get(`v1/cart`);
    console.log(response);

    return [undefined, response.data];
  } catch (error) {
    return [new Error(error.response.data.message)];
  }
}
