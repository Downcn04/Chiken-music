import defaultImg from '@/components/base/lazyload/default.png';
// import { appendClassName } from '@/assets/js/dom';
export const lazyLoad = {
  mounted(el, binding) {
    el.setAttribute('src', defaultImg);
    const options = {
      rootMargin: '0px',
      threshold: 0.1,
    };
    // console.log(el.loading);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          el.classList.add('fade-out');
          el.addEventListener(
            'animationend',
            () => {
              el.setAttribute('src', binding.value);
              el.classList.remove('fade-out');
              el.classList.add('fade-in');
            },
            { once: true },
          );
          observer.unobserve(el);
        }
      });
    }, options);
    observer.observe(el);
  },
};
