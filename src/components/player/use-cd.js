import { useSingerStore } from '@/store';
import { computed, ref, watch } from 'vue';
// 在此处打印两个ref为undefined
export default function useCd() {
  const cdRef = ref();
  const cdImageRef = ref();
  const store = useSingerStore();
  const playing = computed(() => store.playNow);
  const cdCls = computed(() => {
    return playing.value ? 'playing' : '';
  });
  watch(playing, (newValue, oldValue) => {
    syncTransform(cdRef.value, cdImageRef.value);
    // console.log(cdRef.value, cdImageRef.value);
  });
  // console.log(cdRef, cdImageRef);
  // console.log(cdRef.value, cdImageRef.value);
  // syncTransform(cdRef.value, cdImageRef.value);

  const syncTransform = (wrapper, inner) => {
    // debugger;
    if (wrapper) {
      const wrapperStyle = getComputedStyle(wrapper).transform;
      // console.log(wrapperStyle);
      const innerStyle = getComputedStyle(inner).transform;
      // wrapper.style.transform = `'${innerStyle}'`;
      console.log(wrapperStyle);
      // console.log(wrapper.style.transform.concat('', innerStyle));
      // 实现角度叠加
      wrapper.style.transform =
        wrapperStyle === 'none'
          ? innerStyle
          : wrapper.style.transform.concat('', innerStyle);
    }
    // console.log(cdRef.value, cdImageRef.value);
    // if (innerStyle) {
    //   wrapper.style.transform = `${innerStyle}`;
    // }
  };
  // const wrapperStyle = computed(() => {
  //   if (!playing.value) {
  //     return
  //   }
  // })
  return { cdCls, cdRef, cdImageRef };
}
