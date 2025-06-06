<template>
    <footer class="bg-blue-200 py-10">
        <div class="container mx-auto px-4 text-black">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div class="text-center lg:flex lg:justify-center lg:items-center">
                    <SkinFilled class="w-32 mx-auto lg:mx-0 mb-4 lg:mb-0" />
                    <p class="text-sm">
                        Providing the best shopping experience for you. <br />
                        Fast delivery, secure payment, and amazing products.
                    </p>
                </div>
                <div class="flex flex-col items-center lg:items-start">
                    <h5 class="text-lg font-semibold mb-3">Quick Links</h5>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-600 hover:text-primary">Home</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">About Us</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">Privacy Policy</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">Contact</a></li>
                        <li><a href="#" class="text-gray-600 hover:text-primary">FAQ</a></li>
                    </ul>
                </div>
                <div class="flex items-center gap-6 text-4xl justify-center w-1/3">
                    <a href="https://facebook.com" target="_blank" class="text-gray-600 hover:text-primary">
                        <FacebookOutlined />
                    </a>
                    <a href="https://instagram.com" target="_blank" class="text-gray-600 hover:text-primary">
                        <InstagramOutlined />
                    </a>
                    <a href="https://twitter.com" target="_blank" class="text-gray-600 hover:text-primary">
                        <TwitterOutlined />
                    </a>
                    <a href="https://youtube.com" target="_blank" class="text-gray-600 hover:text-primary">
                        <YoutubeOutlined />
                    </a>
                </div>
            </div>

            <!-- Copyright -->
            <div class="mt-10 border-t pt-6 text-center text-sm text-gray-600">
                <p>&copy; 2025 Your Shopping Site. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons-vue';

</script>