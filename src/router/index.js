import { createRouter, createWebHistory } from 'vue-router';
import recommend from '@/views/recommend.vue';
import search from '@/views/search.vue';
import singer from '@/views/singer.vue';
import topList from '@/views/top-list.vue';
import singerDetail from '@/views/singer-detail.vue';
const routes = [
  {
    path: '/',
    redirect: '/recommend',
  },
  {
    path: '/recommend',
    component: recommend,
  },
  {
    path: '/search',
    component: search,
  },
  {
    path: '/singer',
    component: singer,
    children: [
      {
        path: ':id',
        component: singerDetail,
      },
    ],
  },
  {
    path: '/top-list',
    component: topList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
