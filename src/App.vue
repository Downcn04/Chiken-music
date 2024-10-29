<template>
  <div>
    <mHeader class="mheader"></mHeader>
    <Tab class="tab"></Tab>
    <router-view class="view"></router-view>
    <Player></Player>
  </div>
</template>
<script setup>
import mHeader from './components/header/header.vue';
import Player from './components/player/player.vue';
import Tab from './components/tab/tab.vue';
// import { useCounterStore } from './store';
// const store = useCounterStore();
// console.log(store.show);
</script>
<style lang="scss">
// .mheader {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 1000;
//   background-color: $color-background;
// }

// .tab {
//   position: fixed;
//   top: 44px; // 根据实际情况调整与 `<mHeader>` 的距离
//   left: 0;
//   width: 100%;
//   z-index: 999;
//   background-color: $color-background;
// }
// .view {
//   margin-top: 100px;
// }
</style>
