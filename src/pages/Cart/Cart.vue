<template>
    <div class="bg-[#f2f4f7] pt-10 flex flex-col items-center justify-center">
        <a-table :row-selection="rowSelection" :columns="columns" :data-source="user?.user?.cart"
            :row-key="(record: ICartItem) => record.itemID?._id" :pagination="false" class="sm:w-[90%]">
            <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'quantity'">
                    <a-input-number v-model:value="record.quantity" :min="1" :max="record.itemID.remaining"
                        @change.lazy="updateQuantity(record)" />
                </template>
            </template>
        </a-table>
        <div
            class="sm:w-[90%] bg-white p-5 flex justify-end items-center gap-5 m-10 sticky bottom-0.5 border-[#1677ff] border-1  shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] rounded-xl">
            <p class="text-xl">Total of {{ checkoutQuantity }} item<span v-if="checkoutQuantity > 1">s</span><span class="text-3xl text-[#1677ff] ml-2">{{
                checkoutPrice
            }} $</span></p>
            <Button type="primary" size="large" @click="router.push('/payment')">Buy Now</Button>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { TableProps, TableColumnType } from 'ant-design-vue';
import { useUserStore } from '../../store/userStore';
import type { ICartItem } from '../../type';
import { h, onBeforeUnmount, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { DeleteOutlined } from '@ant-design/icons-vue';
import { Button, Modal } from 'ant-design-vue';
import userService from '../../services/userService';
import { useCartStore } from '../../store/cartStore';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';

const user = useUserStore();
const cart = useCartStore();
const checkoutQuantity = ref<number>(0);
const checkoutPrice = ref<number>(0)
const router = useRouter();
const selectedItems = useSelectedItemsStore();

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
    {
        title: 'Actions',
        key: 'actions',
        customRender: ({ record }) => {
            return h('p', { style: { color: 'red', cursor: 'pointer' } }, [
                h(DeleteOutlined, {
                    onClick: () => {
                        Modal.confirm({
                            title: 'Are you sure you want to delete this item?',
                            onOk: async () => {
                                console.log('Item deleted:', record);
                                const updateCart = await userService.deleteItemFromCart(record.itemID._id);
                                user.updateCart(updateCart);
                                cart.setCount(updateCart.reduce((sum: number, item: ICartItem) => sum + (item.quantity || 0), 0));
                            },
                        });
                    },
                })
            ]);
        },
    }
];

const updateQuantity = async (record: ICartItem) => {
    user.updateItemQuantity(record.itemID._id, record.quantity);
    cart.setCount(user.user.cart.reduce((sum: number, item: ICartItem) => sum + (item.quantity || 0), 0));
};

onBeforeUnmount(async () => {
    try {
        await userService.updateCart(user.user.cart);
    } catch (error) {
        console.error('Error updating quantity:', error);
    }
});

const rowSelection: TableProps['rowSelection'] = {
    onChange: (_blank, selectedRows: ICartItem[]) => {
        const totalSelectedQuantity = selectedRows.reduce(
            (total: number, item: ICartItem) => total + (item.quantity || 0), 0
        );
        const totalSelectedPrice = selectedRows.reduce(
            (total: number, item: ICartItem) => total + (Number(item.itemID.price) * item.quantity || 0), 0
        );
        checkoutQuantity.value = totalSelectedQuantity
        checkoutPrice.value = totalSelectedPrice
        selectedItems.setSelectedItems(selectedRows)
    },
};
</script>