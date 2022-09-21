import { createRouter, createWebHistory } from "vue-router";
import Factory from '../pages/Factory.vue';
import Form from '../pages/Form.vue';

const routes = [
    {
        name: 'Factory',
        path: '/',
        component: Factory
    },
    {
        name: 'Form',
        path: '/form',
        component: Form
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router