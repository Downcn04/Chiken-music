import Loading from './loading.vue';
import { createApp } from 'vue';
import { appendClassName, removeClassName } from '@/assets/js/dom';
// eslint-disable-next-line
export const loadingDirective = {
  mounted(el, binding) {
    const app = createApp(Loading);
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      el.appendChild(el.instance.$el);
    }
    const style = getComputedStyle(el);
    if (['absolute', 'fixed', 'relative'].indexOf(style.position) === -1) {
      appendClassName(el, 'g-relative');
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value
        ? el.appendChild(el.instance.$el)
        : el.removeChild(el.instance.$el);
    }
    removeClassName(el, 'g-relative');
  },
};
