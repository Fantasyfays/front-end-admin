import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from "@/views/Dashboard.vue";
import Users from "@/views/Users.vue";

const routes = [
    { path: '/', component: Dashboard },
    { path: '/users', component: Users }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
