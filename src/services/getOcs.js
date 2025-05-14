import api from "../configs/axiosConfig";

export default async function getOcsMethod() {
  try {
    const response = await api.get(`/v1/oc`);

    return [undefined, response.data];
  } catch (error) {
    return [new Error(error.response.data.message)];
  }
}