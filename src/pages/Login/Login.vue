<template>
    <div class="bg-[#f0f2f5] flex items-center justify-center h-screen">
        <a-form :model="formState" name="basic" autocomplete="on" class="bg-white md:w-[500px] w-[400px] rounded-xl !p-5"
            @finish="onFinish" layout="vertical">
            <p class="text-center text-3xl font-semibold text-[#1677ff]">Login</p>
            <p class="flex justify-center items-center text-xl text-[#1677ff] mt-2">Welcome to
                <SkinFilled class="mx-2" /> shop
            </p>
            <a-divider />
            <a-form-item label="Email" name="email" :rules="[{ required: true, message: 'Please input your email!' }]">
                <a-input v-model:value="formState.email" size="large" />
            </a-form-item>
            <a-form-item label="Password" name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password" size="large" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" size="large" class="w-full" :loading="loading">Submit</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { SkinFilled } from '@ant-design/icons-vue';
import userService from '../../services/userService';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/userStore';

const loading = ref(false);
const userStore = useUserStore();
const router = useRouter();
interface FormState {
    email: string;
    password: string;
}

const formState = reactive<FormState>({
    email: '',
    password: '',
});

const onFinish = async (values: FormState) => {
    loading.value = true;
    try {
        const user = await userService.login(values.email, values.password);
        localStorage.setItem('access_token', JSON.stringify(user.accessToken));
        const userData = await userService.getUserInformation();
        userStore.setUser(userData);
        router.push('/');
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

</script>
