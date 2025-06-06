<template>
    <div class="bg-[#f2f4f7] pt-10 flex flex-col items-center justify-center">
        <contextHolder />
        <div class="sm:w-[90%] bg-white mb-10 p-5 rounded-xl">
            <p class="flex justify-start items-center gap-2 text-xl text-[#1677ff]"><font-awesome-icon
                    :icon="['fas', 'location-dot']" />Shipping Address</p>
            <a-form :model="formState" :rules="rules" ref="formRef" layout="vertical">
                <a-form-item label="Full Name" name="fullName" required class="!mt-4">
                    <a-input v-model:value="formState.fullName" placeholder="Full Name" />
                </a-form-item>

                <a-form-item label="Street Address" name="streetAddress" required>
                    <a-input v-model:value="formState.streetAddress" placeholder="123 Main St" />
                </a-form-item>

                <a-form-item label="Phone Number" name="phoneNumber" required>
                    <a-input v-model:value="formState.phoneNumber" placeholder="+84 123 456 789" />
                </a-form-item>
            </a-form>
        </div>
        <a-table :columns="columns" :data-source="selectedItems.selectedItems"
            :row-key="(record: ICartItem) => record.itemID?._id" :pagination="false" class="sm:w-[90%]">
        </a-table>
        <div
            class="sm:w-[90%] bg-white p-5 flex justify-end items-center gap-5 m-10 sticky bottom-0.5 border-[#1677ff] border-1 shadow-[0_-4px_10px_-2px_rgba(0,0,0,0.1)] rounded-xl">
            <p class="text-xl">Total of {{ selectedItems.totalQuantity }} item<span
                    v-if="selectedItems.totalQuantity > 1">s
                </span><span class="text-3xl text-[#1677ff]">{{
                    selectedItems.totalPrice
                    }} $</span></p>
            <Button type="primary" size="large" @click="handleOrder()" :loading="loading">Order Now</Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref } from 'vue';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';
import type { ICartItem } from '../../type';
import { Button, type TableColumnType } from 'ant-design-vue';
import { RouterLink, useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';
import orderService from '../../services/orderService';
import { reactive } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { useCartStore } from '../../store/cartStore';

const [messageApi, contextHolder] = message.useMessage();

const selectedItems = useSelectedItemsStore();
const user = useUserStore();
const cart = useCartStore();
const router = useRouter()
const formRef = ref<FormInstance>();
const loading = ref<boolean>(false);
const formState = reactive({
    fullName: user.user.username,
    streetAddress: '',
    phoneNumber: user.user.phone || '',
});

const rules = {
    fullName: [{ required: true, message: 'Please input your full name', trigger: 'blur' }],
    streetAddress: [{ required: true, message: 'Please input your address', trigger: 'blur' }],
    phoneNumber: [{ required: true, message: 'Please input your phone number', trigger: 'blur' }],
};
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
];

onMounted(() => {
    if (selectedItems.selectedItems.length === 0)
        router.push('/');
})


const handleOrder = async () => {
    try {
        await formRef.value?.validate();
        loading.value = true;
        const rs = await orderService.postOrder({
            username: formState.fullName,
            address: formState.streetAddress,
            phoneNumber: formState.phoneNumber,
            totalPrice: selectedItems.totalPrice,
            orders: selectedItems.selectedItems
        });
        cart.decrement(selectedItems.totalQuantity)
        user.setUser(rs)
        messageApi.success("Order placed successfully!")
    } catch (error) {
        console.warn('Validation failed', error);
    } finally {
        loading.value = false
    }
};

onBeforeUnmount(() => {
    selectedItems.clearSelectedItems();
});

</script>