import Vue from 'vue';
import Router from 'vue-router';
import MainComponent from '@/views/MainComponent.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'main',
      component: MainComponent,
    },
    {
      path: '/:date',
      // name: 'main',
      component: MainComponent,
    },
  ],
});
