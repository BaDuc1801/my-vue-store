<template>
    <div class="flex justify-between items-center bg-[#1677ff] px-5 py-2 text-white">
        <contextHolder />
        <RouterLink to="/">
            <div class="flex justify-center items-center gap-2 text-3xl">
                <SkinFilled />
                <p class="font-extrabold">Shop</p>
            </div>
        </RouterLink>
        <div class="max-sm:hidden">
            <p class="text-xl font-bold">Let's Go Shopping Now!</p>
        </div>
        <div v-if="userStore.isLoggedIn" class="flex justify-center items-center gap-5">
            <RouterLink to="/my-cart">
                <a-badge :count="cartStore.count" :show-zero="false">
                    <font-awesome-icon :icon="['fas', 'cart-shopping']" class="text-2xl text-white" />
                </a-badge>
            </RouterLink>
            <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link cursor-pointer" @click.prevent>
                    <div class="w-10 h-10 rounded-full">
                        <img :src="userStore?.user?.avatar" alt="User Avatar" class="w-full h-full rounded-full" />
                    </div>
                </a>
                <template #overlay>
                    <a-menu>
                        <a-menu-item key="0">
                            <RouterLink to="/my-orders">My Orders</RouterLink>
                        </a-menu-item>
                        <a-menu-item key="2">
                            <RouterLink to="/my-profile">My Profile</RouterLink>
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="1" @click="onLogout">Logout</a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>
        </div>
        <RouterLink v-else to="/login">
            <Button size="large" class="!text-semibold !text-[18px] !px-5">Login</Button>
        </RouterLink>
    </div>
</template>

<script lang="ts" setup>
import { SkinFilled } from '@ant-design/icons-vue';
import { useCartStore } from '../../store/cartStore';
import { RouterLink, useRouter } from 'vue-router';
import { Button } from 'ant-design-vue';
import { useUserStore } from '../../store/userStore';
import { onMounted } from 'vue';
import userService from '../../services/userService';
import { message } from 'ant-design-vue';

const [messageApi, contextHolder] = message.useMessage();

const cartStore = useCartStore();
const userStore = useUserStore()
const router = useRouter();

const onLogout = () => {
    userStore.logout();
    router.push('/login');
}

onMounted(() => {
    if (userService.getAccessToken() && userService.isAccessTokenExpired()) {
        router.push('/');
        messageApi.info('Phiên đăng nhập đã hết hạn', 2);
        userStore.logout();
        return;
    }
    const cart = userStore?.user?.cart || [];
    const totalQuantity = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
    cartStore.setCount(totalQuantity);
});

</script>