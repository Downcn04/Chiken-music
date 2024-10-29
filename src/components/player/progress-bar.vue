<template>
  <div class="progress-bar">
    <div class="bar-inner" ref="barRef">
      <div class="progress" :style="wid"></div>
      <div
        class="progress-btn"
        :style="btnStyle"
        @touchstart.prevent.stop="startTouch"
        @touchmove.prevent.stop="moveTouch"
        @touchend.prevent.stop="endTouch"
      ></div>
    </div>
  </div>
</template>

<script setup>
// import { emit } from 'backend/prod.server';
import {
  computed,
  defineProps,
  ref,
  watch,
  defineEmits,
  defineExpose,
} from 'vue';
const alloffset = ref(0);
// 变化量
// const pdelta=ref(0)
const page = {};
const pdelta = ref(0);
const props = defineProps(['currentTime']);
// 写死的数据 无法获取总时间
const totalTime = ref(273);
const progress = computed(() => time.value / totalTime.value);
// import { ref, reactive } from 'vue';
const time = computed(() => props.currentTime);
// const buttonStyle = computed(() => {
//   return  'transform: '
// })
// const offset = ref(0);
const barRef = ref();
const emit = defineEmits(['offsetall']);
// const alloffset = computed(() => {
//   return barRef.value.offsetWidth * progress.value;
// });
// alloffset.value = alloffset.value + page.delta;
// const offse = ref(alloffset.value);
const wid = computed(() => {
  if (barRef.value) {
    return `width:${alloffset.value}px`;
  } else {
    return `width:'0px'`;
  }
});
const btnStyle = computed(() => {
  if (barRef.value) {
    return `transform:translate3d(${alloffset.value - 5}px,0,0)`;
  } else {
    return `transform:translate3d(0,0,0)`;
  }
});
watch(progress, (old, newv) => {
  // console.log(old);
  // const oldallof = barRef.value.offsetWidth * progress.value + pdelta.value;
  // alloffset.value = barRef.value.offsetWidth * progress.value + pdelta.value;
  // emit('offsetall', alloffset.value);
  calculate(newv);
  // bar的宽度为279.5
  // pdelta.value = 0;
  // emit('alloffset', alloffset.value);
  // console.log(newv);
});
const calculate = (progress) => {
  alloffset.value = barRef.value.offsetWidth * progress + pdelta.value;
  emit('offsetall', alloffset.value);
};
// const offserW = computed(() => refProgress.value.offsetWidth);
// const swapperStyle = computed(() => {
//   return `width:'${offserW.value * progress.value}'`;
// });
// console.log(swapperStyle.value);
const startTouch = (e) => {
  // console.log(e.touches[0]);
  page.x1 = e.touches[0].clientX;
  page.beginWidth = alloffset.value;
};
// 待修改 滚动条效果不明显
const moveTouch = (e) => {
  const delta = e.touches[0].pageX - page.x1;
  // console.log(delta);
  // if()
  page.delta = delta;
  // pdelta.value = page.delta;
  // page.delta = 0;
};
const endTouch = (e) => {
  alloffset.value += page.delta;
};
// 当你需要在数据变化之后等待 DOM 更新完成时，使用 nextTick
defineExpose({
  calculate,
});
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 200px;
  .bar-inner {
    top: 130px;
    width: 65%;
    margin: auto;
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    height: 10px;
    .progress {
      position: absolute;
      // top: 100px;
      height: 10px;
      width: 25px;
      background-color: $color-theme;
      border-radius: 10px;
      // z-index: 1000;
    }
    .progress-btn {
      // margin: 0 auto;
      top: -5px;
      // line-height: 10px;
      position: absolute;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      background-color: $color-theme;
      border: 5px solid;
      border-radius: 50%;
    }
  }
}
</style>
