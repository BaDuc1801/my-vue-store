import { defineStore } from 'pinia';
import type { ICartItem } from '../type';

export const useSelectedItemsStore = defineStore('selectedItems', {
    state: () => ({
        selectedItems: [] as ICartItem[],
    }),

    actions: {
        setSelectedItems(items: ICartItem[]) {
            this.selectedItems = items;
        },
        clearSelectedItems() {
            this.selectedItems = [];
        },
    },

    getters: {
        totalPrice: (state) =>
            state.selectedItems.reduce((sum, item) => {
                const itemTotal = Number(item.itemID?.price) * Number(item.quantity || 0);
                return sum + itemTotal;
            }, 0),

        totalQuantity: (state) =>
            state.selectedItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
    },

    persist: {
        storage: localStorage,
    },
});
