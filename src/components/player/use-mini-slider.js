import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';
import {
  computed,
  ref,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useSingerStore } from '@/store';
BScroll.use(Slide);
export default function useMiniSlider() {
  const singerStore = useSingerStore();
  const audioRef = ref();
  const playList = computed(() => singerStore.singerDetail);
  const miniFullScreen = computed(() => singerStore.miniFullScreen);
  const sliderWrapperRef = ref();
  const slider = ref();
  const currentIndex = computed(() => singerStore.currentIndex);
  const fullshow = computed(() => {
    return playList.value && miniFullScreen.value;
  });
  onMounted(() => {
    // console.log(currentIndex.value);
    watch(fullshow, async (newvalue) => {
      if (newvalue) {
        await nextTick();
        // 添加检查确保 DOM 元素存在
        if (sliderWrapperRef.value && sliderWrapperRef.value.children) {
          slider.value = new BScroll(sliderWrapperRef.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: {
              autoplay: false,
              loop: true,
            },
          });
          slider.value.on('slidePageChanged', ({ pageX }) => {
            singerStore.currentIndex = pageX;
            singerStore.currentSong = playList.value[pageX];
          });
          // 这里要设置计算属性
          // 组件Bug
          slider.value.goToPage(currentIndex.value, 0, 0);
        }
      } else {
        // 当 fullshow 为 false 时，清理实例
        if (slider.value) {
          // console.log(11111);
          // audioRef.pause();
          // console.log(audioRef);
          const sliderPage = computed(() => currentIndex.value);
          slider.value.goToPage(sliderPage.value, 0, 0);
          slider.value.destroy();
          // slider.value = null;
        }
      }
    });
  });
  // 将 watch 移到外面，并添加清理逻辑
  onBeforeUnmount(() => {
    if (slider.value) {
      slider.value.destroy();
    }
  });
  return {
    sliderWrapperRef,
    audioRef,
  };
}
