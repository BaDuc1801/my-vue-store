import type { ICartItem } from "../type";
import axiosJWT from "./axiosJWT";
import userService from "./userService";

const apiUrl = import.meta.env.VITE_APP_BE_URL;
const orderUrl = `${apiUrl}/orders`;

const orderService = {
    getOrderByUserID: async () => {
        const accessToken = await userService.getAccessToken();
        const rs = await axiosJWT.get(`${orderUrl}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data;
    },

    postOrder: async (data: { username: string, address: string, phoneNumber: string, totalPrice: number, orders: ICartItem[] }) => {
        const accessToken = await userService.getAccessToken();
        const rs = await axiosJWT.post(`${orderUrl}/`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data;
    },

    getOrdersByStatus: async (status: string) => {
        const accessToken = await userService.getAccessToken();
        const rs = await axiosJWT.get(`${orderUrl}/get-by-status/${status}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return rs.data;
    }
}

export default orderService