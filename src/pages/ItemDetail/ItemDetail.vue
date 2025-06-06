<template>
  <div class="bg-[#f2f4f7] flex justify-center items-center py-10">
    <div class="bg-white w-[70%] rounded-xl p-5 flex gap-5 max-md:flex-col max-lg:w-[90%]">
      <div v-if="loading" class="flex justify-center items-center w-full h-[50vh]">
        <a-spin size="large" class="w-full items-center !pt-5" />
      </div>
      <template v-else-if="itemData && itemData.img?.length > 0">
        <a-carousel class="w-1/3 max-md:w-full">
          <div v-for="(img, index) in itemData?.img" :key="index">
            <img :src="img" alt="Item Image" class="w-full h-auto" />
          </div>
        </a-carousel>
        <div class="flex flex-col justify-between">
          <div>
            <p class="font-semibold text-xl">{{ itemData?.itemName }}</p>
            <div class="flex items-center justify-between flex-wrap gap-10 my-2">
              <a-rate :value="itemData?.evaluate" allow-half disabled />
              <p>Sold: {{ itemData?.sold }}</p>
            </div>
            <p><span class="font-semibold">Price: </span>{{ itemData?.price }}$</p>
            <p class="text-justify my-2"><span class="font-semibold">Description: </span> {{ itemData?.description }}
            </p>
          </div>
          <div>
            <div class="flex justify-start items-center gap-5">
              <a-input-number v-model:value="number" :min="1" :max="itemData?.remaining" />
              <p>{{ itemData?.remaining }} remaining</p>
            </div>
            <div class="flex justify-start items-center gap-5 mt-5">
              <Button size="large" @click="addToCart">Add to Cart<font-awesome-icon :icon="['fas', 'cart-shopping']"
                  class="text-[#1677ff] ml-3" /></Button>
              <Button size="large" type="primary" @click="onClickBuyNow()">Buy Now</Button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import itemService from '../../services/itemService';
import { useRoute, useRouter } from 'vue-router';
import type { IItem } from '../../type';
import { Button, Modal } from 'ant-design-vue';
import { useCartStore } from '../../store/cartStore';
import userService from '../../services/userService';
import { useUserStore } from '../../store/userStore';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';

const route = useRoute();
const router = useRouter();
const cart = useCartStore();
const user = useUserStore();
const selectedItems = useSelectedItemsStore();
const id = route.params.id;
const itemData = ref<IItem>()
const number = ref<number>(1)
const loading = ref<boolean>(false)

onMounted(async () => {
  try {
    window.scrollTo(0, 0);
    loading.value = true
    itemData.value = await itemService.getItemById(id as string);
  } catch (error) {
    throw new Error("Failed to fetch item:" + error);
  } finally {
    loading.value = false;
  }
})

const addToCart = async () => {
  try {
    if (itemData.value) {
      cart.increment(number.value);
      const rs = await userService.addToCart({ itemID: itemData.value._id, quantity: number.value });
      user.updateCart(rs);
    }
  } catch (error) {
    Modal.confirm({
      title: 'Please log in',
      content: 'You need to log in to add items to the cart.',
      okText: 'Login',
      cancelText: 'Cancel',
      onOk: () => {
        router.push('/login');
      }
    });
  }
}

const onClickBuyNow = () => {
  router.push('/payment');
  if(itemData.value)
  selectedItems.setSelectedItems([{itemID: itemData.value, quantity: number.value}])
}
</script>