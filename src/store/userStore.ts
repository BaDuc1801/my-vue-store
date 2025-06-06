import { defineStore } from 'pinia';
import type { ICartItem, IUser } from '../type';
import type { IItem } from '../type';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            _id: '',
            username: '',
            avatar: '',
            phone: '',
            address: '',
            place: '',
            email: '',
            password: '',
            favourites: [] as IItem[],
            cart: [] as ICartItem[],
            role: ''
        },
    }),
    actions: {
        setUser(userData: IUser) {
            this.user = userData;
        },
        updateCart(cart: ICartItem[]) {
            this.user.cart = cart;
        },
        logout() {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            this.$reset();
        },
        updateItemQuantity(itemId: string, quantity: number) {
            const item = this.user.cart.find(item => item.itemID._id === itemId);
            if (item) {
                item.quantity = quantity;
            }
        },
    },
    getters: {
        isLoggedIn: (state) => state.user._id,
    },
    persist: {
        storage: localStorage,
    },
});
