<script setup lang="ts">
import Footer from '../../components/Footer/Footer.vue';
import Header from '../../components/Header/Header.vue';
</script>

<template>
    <div>
        <Header/>
        <main>
            <router-view></router-view>
        </main>
        <Footer/>
    </div>
</template>