<template>
    <div class="bg-[#f2f4f7] py-10 flex items-center justify-center">
        <a-tabs class="bg-white !px-5 rounded-xl sm:w-[90%]" size="large" v-model:activeKey="activeKey">
            <a-tab-pane key="All Orders" tab="All Orders">
                <a-spin size="large" :spinning="loading" class="w-full items-center !py-5" />
                <ListOrder :orders="listOrder" />
            </a-tab-pane>
            <a-tab-pane key="Pending" tab="Pending">
                <a-spin size="large" :spinning="loading" class="w-full items-center !py-5" />
                <ListOrder :orders="listOrder" />
            </a-tab-pane>
            <a-tab-pane key="Processing" tab="Processing">
                <a-spin size="large" :spinning="loading" class="w-full items-center !py-5" />
                <ListOrder :orders="listOrder" />
            </a-tab-pane>
            <a-tab-pane key="Shipped" tab="Shipped"><p class="text-xl mb-5 text-center">There are no orders.</p></a-tab-pane>
            <a-tab-pane key="Delivered" tab="Delivered"><p class="text-xl mb-5 text-center">There are no orders.</p></a-tab-pane>
            <a-tab-pane key="Cancelled" tab="Cancelled"><p class="text-xl mb-5 text-center">There are no orders.</p></a-tab-pane>
            <a-tab-pane key="Returned" tab="Returned"><p class="text-xl mb-5 text-center">There are no orders.</p></a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import orderService from '../../services/orderService';
import { type IOrder } from '../../type';
import ListOrder from '../../components/ListOrder/ListOrder.vue';

const activeKey = ref('All Orders');
const loading = ref<boolean>(false)
const listOrder = ref<IOrder[]>([])

onMounted(async () => {
    loading.value = true;
    listOrder.value = await orderService.getOrderByUserID()
    loading.value = false;
});

watch(
    [activeKey],
    async () => {
        listOrder.value = [];
        loading.value = true;
        if (activeKey.value === "All Orders") {
            listOrder.value = await orderService.getOrderByUserID()
        }
        else {
            listOrder.value = await orderService.getOrdersByStatus(activeKey.value)
        }
        window.scrollTo(0, 0)
        loading.value = false;
    }
);

</script>
