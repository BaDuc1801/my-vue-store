import axios from "axios";

const url = import.meta.env.VITE_APP_BE_URL;
const itemUrrl = `${url}/items`;

const itemService = {
    getAllItems: async (params: {
        currentPage?: number;
        filterData?: string;
        pageSize?: number;
        sortBy?: string;
        sortType?: string;
        searchValue?: string;
    }) => {
        try {
            const response = await axios.get(itemUrrl, {
                params: {
                    ...params
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getItemById: async (id : string) => {
        try {
            const response = await axios.get(`${itemUrrl}/get-item/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default itemService;