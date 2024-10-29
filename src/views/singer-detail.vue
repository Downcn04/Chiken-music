<template>
  <div>
    <musicList></musicList>
  </div>
</template>

<script setup>
// import { onMounted } from 'vue';
import { useCounterStore } from '@/store';
// import { getSingerDetail } from '@/service/search';
import musicList from '@/components/music-list/music-list.vue';
// import { processSongs } from '@/service/song';
const store = useCounterStore();
// const props = ops(['data', 'title', 'pic']);
// console.log(props);
console.log(store.mid);
// 在这里的onMounted里向Pinia里赋值则出现问题
// console.log(props);
</script>

<style lang="scss" scoped>
div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: $color-highlight-background;
}
</style>
