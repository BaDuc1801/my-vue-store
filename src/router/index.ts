import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Login from '../pages/Login/Login.vue'
import Layout from '../pages/Layout/Layout.vue'
import ItemDetail from '../pages/ItemDetail/ItemDetail.vue'
import Cart from '../pages/Cart/Cart.vue'
import Payment from '../pages/Payment/Payment.vue'
import MyOrder from '../pages/MyOrders/MyOrder.vue'
import Profile from '../pages/Profile/Profile.vue'

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/item/:id',
                component: ItemDetail,
                props: true,
            },
            {
                path: '/my-cart',
                component: Cart,
            },
            {
                path: '/payment',
                component: Payment
            },
            {
                path: '/my-orders',
                component: MyOrder
            },
            {
                path: '/my-profile',
                component: Profile
            }
        ],
    },
    {
        path: '/item',
        redirect: '/',
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
