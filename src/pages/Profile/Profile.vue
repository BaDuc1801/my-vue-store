<template>
  <div class="bg-[#f2f4f7] flex justify-center items-center py-10">
    <contextHolder />
    <a-form
      :model="formState"
      ref="formRef"
      layout="vertical"
      class="bg-white sm:w-1/2 w-full max-sm:!mx-5 !p-5 rounded-xl flex gap-5"
    >
      <div class="flex-1 flex flex-col items-center justify-center gap-4">
        <img
          :src="previewImage || user.user.avatar"
          alt="avatar"
          class="w-40 h-40 rounded-full object-cover"
        />
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          @change="handleImageChange"
          style="display: none"
        />
        <Button
          type="default"
          size="small"
          @click="triggerFileInput"
        >
          Upload
        </Button>
      </div>

      <div class="flex-1">
        <a-form-item label="Full Name" name="fullName" class="!mt-4">
          <a-input v-model:value="formState.fullName" placeholder="Full Name" />
        </a-form-item>
        <a-form-item label="Email" name="email" class="!mt-4">
          <a-input v-model:value="formState.email" disabled />
        </a-form-item>
        <a-form-item label="Phone Number" name="phoneNumber">
          <a-input
            v-model:value="formState.phoneNumber"
            placeholder="+84 123 456 789"
          />
        </a-form-item>
        <div class="flex justify-center">
          <Button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            @click.prevent="onClickUpdate"
          >
            Update
          </Button>
        </div>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useUserStore } from "../../store/userStore";
import { Button, message, type FormInstance } from "ant-design-vue";
import userService from "../../services/userService";

const [messageApi, contextHolder] = message.useMessage();
const user = useUserStore();
const formRef = ref<FormInstance>();
const loading = ref<boolean>(false);

const formState = reactive({
  email: user.user.email,
  fullName: user.user.username,
  phoneNumber: user.user.phone || "",
});

const previewImage = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleImageChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const onClickUpdate = async () => {
  loading.value = true;
  try {
    if (selectedFile.value) {
      const formData = new FormData();
      formData.append("avatar", selectedFile.value);
      await userService.uploadAvatar(formData);
    }

    const rs = await userService.updateUser({
      username: formState.fullName,
      phone: formState.phoneNumber,
    });

    if (!selectedFile.value) {
      user.setUser(rs);
    }

    messageApi.success("Information updated successfully.");
    previewImage.value = null;
    selectedFile.value = null;
  } catch (error) {
    messageApi.error("Failed to update information.");
  } finally {
    loading.value = false;
  }
};
</script>
