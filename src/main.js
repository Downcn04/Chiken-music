import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/assets/scss/index.scss';
// import lazyPlugin from 'vue3-lazy';
import { loadingDirective } from './components/base/loading/directive';
import { lazyLoad } from './components/base/lazyload/directive';
import { noresultDirective } from './components/base/noresult/directive';
const app = createApp(App);
const pinia = createPinia();
app
  .use(router)
  .use(pinia)
  .directive('loading', loadingDirective)
  .directive('lazy', lazyLoad)
  .directive('noresult', noresultDirective)
  .mount('#app');
