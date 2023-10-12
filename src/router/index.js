import {createRouter, createWebHistory} from "vue-router";
import children from './children'

const routes = [
    {
        path: '/',
        redirect: "/home",
    },
    ...children,

]


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
