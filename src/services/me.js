import api from "../configs/axiosConfig";

export default async function me() {
    const response = await api.get("v1/user/me");
    console.log(response);
}