import { createRouter, createWebHistory } from "vue-router";
import Factory from '../pages/Factory.vue';
import Form from '../pages/Form.vue';

const routes = [
    {
        name: 'Form',
        path: '/',
        component: Form
    },
    {
        name: 'Factory',
        path: '/factory',
        component: Factory
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router