import axios from "axios";
import axiosJWT from "./axiosJWT";
import { jwtDecode } from "jwt-decode";
import type { ICartItem } from "../type";

const apiUrl = import.meta.env.VITE_APP_BE_URL;
const userUrl = `${apiUrl}/users`;

const userService = {
    getAccessToken: () => {
        const token = localStorage.getItem("access_token");
        return token ? JSON.parse(token) : null;
    },

    login: async (email: string, password: string) => {
        const res = await axios.post(`${userUrl}/login`, {
            email,
            password
        }, {
            withCredentials: true,
        })
        return res.data
    },

    isAccessTokenExpired: (): boolean => {
        try {
            const token = userService.getAccessToken();
            const decoded: { exp: number } = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error('Error decoding token:', error);
            return true;
        }
    },

    register: async (email: string, username: string, password: string) => {
        const res = await axios.post(`${userUrl}/register`, {
            email,
            username,
            password
        })
        return res.data
    },

    getUserInformation: async () => {
        try {
            const accessToken = userService.getAccessToken();
            const rs = await axiosJWT.get(`${userUrl}/get-user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return rs.data;
        } catch (error) {
            console.log(error);
        }
    },

    refreshAccessToken: async () => {
        const res = await axios.post(`${userUrl}/refresh-token`,
            {},
            {
                withCredentials: true,
            }
        );
        return res.data;
    },

    addToCart: async (data: { itemID: string; quantity: number; }) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/add-to-cart`,
            data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data;
    },

    deleteItemFromCart: async (itemID: string) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/delete-cart/`, { itemID }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return res.data;
    },

    updateCart: async (data: ICartItem[]) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/update-cart`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return res.data;
    },

    updateUser: async (data: { username: string, phone: string }) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/update-user`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
        });
        return res.data;
    },

    uploadAvatar: async (avatar: FormData) => {
        const accessToken = userService.getAccessToken();
        const res = await axiosJWT.put(`${userUrl}/up-avatar`, avatar, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    }
}

export default userService