import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
// import PreviewPage from '@/pages/PreviewPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  // { name: 'preview', component: PreviewPage, path: '/preview' },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;