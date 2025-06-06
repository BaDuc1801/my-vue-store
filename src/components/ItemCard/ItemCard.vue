<script setup lang="ts">
import type { IItem } from '../../type';

const props = defineProps<{
    item: IItem[]
}>()
</script>

<template>
    <div class="grid xl:grid-cols-4 gap-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
        <div v-for="item in props.item" :key="item._id">
            <router-link :to="`/item/${item._id}`">
                <div
                    class="rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-101 transform border-2 border-gray-200 cursor-pointer text-black">
                    <img :src="item?.img[0]" alt="Item Image" class="h-[300px] w-full" />
                    <div class="p-2">
                        <p class="text-lg font-bold truncate">{{ item?.itemName }}</p>
                        <p class="font-semibold">{{ item.price }} $</p>
                        <div class="flex items-center justify-between flex-wrap">
                            <a-rate v-model:value="item.evaluate" allow-half disabled/>
                            <p>Sold: {{ item.sold }}</p>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
