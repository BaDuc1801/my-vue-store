import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment(value: number) {
      this.count += value;
    },
    decrement(value: number) {
      this.count -= value;
    },
    setCount(value: number) {
      this.count = value;
    },
    reset() {
      this.count = 0;
    }
  },
  getters: {
    isEmpty: (state) => state.count === 0,
  }
});
