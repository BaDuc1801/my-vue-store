<template>
    <div v-for="item in props.orders" :key="item._id"
        class="p-2 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] rounded-xl mb-5">
        <div class="flex justify-between text-lg mb-2 px-2">
            <p>Order Date: {{ new Date(item.createdAt).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) }}
                - {{ new
                    Date(item.createdAt).toLocaleTimeString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }) }}</p>
            <p>Status: <span class="text-[#1677ff] ml-2 text-xl font-semibold"> {{ item.status }} </span></p>
        </div>
        <a-table :dataSource="item.orders" :columns="columns" :pagination="false" />
        <div class="text-lg p-2 flex justify-end">Total Price: <span class="text-[#1677ff] ml-2 text-xl font-semibold"> {{ item.totalPrice }} $ </span></div>
    </div>
</template>

<script setup lang="ts">
import { type TableColumnType } from 'ant-design-vue';
import type { ICartItem, IOrder } from '../../type';
import { h } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    orders: IOrder[]
}>()

const columns: TableColumnType<ICartItem>[] = [
    {
        title: 'Product',
        customRender: ({ record }) => {
            return h('div', { style: { display: 'flex', alignItems: 'center' } }, [
                h('img', {
                    src: record?.itemID?.img?.[0],
                    alt: 'Product Image',
                    style: { width: '50px', height: '50px', marginRight: '8px', objectFit: 'cover' }
                }),
                h(RouterLink, { to: `/item/${record?.itemID?._id}` }, {
                    default: () => record?.itemID?.itemName
                })
            ]);
        }
    },
    {
        title: 'Unit Price',
        customRender: ({ record }) => {
            return h('p', record.itemID?.price);
        },
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Total Price',
        customRender: ({ record }) => {
            const totalPrice = Number(record.itemID?.price) * Number(record.quantity);
            return h('p', totalPrice);
        },
    },
]
</script>