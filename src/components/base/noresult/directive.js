import noresult from './noresult.vue';
import { createApp } from 'vue';
export const noresultDirective = {
  mounted(el, binding) {
    const app = createApp(noresult);
    const div = document.createElement('div');
    app.mount(div);
    if (binding.value) {
      el.appendChild(div);
    }
  },
};
