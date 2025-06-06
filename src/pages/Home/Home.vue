<template>
  <div class="bg-[#f2f4f7] flex flex-col justify-center items-center py-10">
    <div class="bg-white w-[90%] rounded-2xl flex flex-col justify-center items-center gap-5 pb-10">
      <div
        class="px-10 pt-10 w-full flex justify-between items-center gap-10 max-md:flex-col max-md:gap-5 max-md:items-end">
        <a-input-search v-model:value="searchValue" placeholder="Search..." enter-button size="large" class="" />
        <a-select v-model:value="sortType" size="large" :options="options" @change="handleSelectChange"></a-select>
      </div>
      <a-tabs v-model:activeKey="activeKey" size="large" class="w-full !px-10 !pb-5" @change="onTabChange">
        <a-tab-pane key="" tab="All">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
        <a-tab-pane key="shirt" tab="Shirts">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
        <a-tab-pane key="pants" tab="Pants">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
        <a-tab-pane key="shoe" tab="Shoes">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
        <a-tab-pane key="bag" tab="Bags">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
        <a-tab-pane key="accessories" tab="Accessories">
          <a-spin size="large" :spinning="loading" class="w-full items-center !pt-5" />
          <ItemCard :item="listItems.items" />
        </a-tab-pane>
      </a-tabs>
      <a-pagination v-model:current="currentPage" :total="listItems.totalItems" :page-size="pageSize" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import type { IListItem } from '../../type';
import ItemCard from '../../components/ItemCard/ItemCard.vue';
import itemService from '../../services/itemService';
import type { SelectProps } from 'ant-design-vue';
const activeKey = ref<string>("");
const loading = ref<boolean>(false)
const currentPage = ref<number>(1);
const pageSize = ref<number>(12);
const sortType = ref<string>('-1');
const searchValue = ref<string>('');
const listItems = ref<IListItem>({
  items: [],
  totalItems: 0,
});
const options = ref<SelectProps['options']>([
  { value: '1', label: 'Sort by Price: Low to High' },
  { value: '-1', label: 'Sort by Price: High to Low' },
]);

onMounted(async () => {
  await fetchItems();
});

watch(
  [activeKey, currentPage, sortType, searchValue],
  async () => {
    await fetchItems();
    window.scrollTo(0, 0)
  }
);

const fetchItems = async () => {
  loading.value = true;
  listItems.value = {
    items: [],
    totalItems: 0,
  };
  try {
    const response = await itemService.getAllItems({
      currentPage: currentPage.value,
      filterData: activeKey.value,
      pageSize: pageSize.value,
      sortBy: "price",
      sortType: sortType.value,
      searchValue: searchValue.value,
    });
    listItems.value = response;
  } catch (error) {
    throw new Error("Failed to fetch items:" + error);
  } finally {
    loading.value = false;
  }
};

const onTabChange = () => {
  currentPage.value = 1;
}

const handleSelectChange = () => {
  currentPage.value = 1;
};
</script>