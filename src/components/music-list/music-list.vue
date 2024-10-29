<template>
  <!-- <div class="music-list">

    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImageStyle">
      <div class="play-btn-wrapper">

      </div>
      <div class="filter"></div>
    </div>
    <div class="song-list-wrapper"></div>
  </div> -->
  <div class="all">
    <div class="menu">
      <div class="title">{{ title }}</div>
      <div class="back">
        <i class="icon-back" @click="goback"></i>
      </div>
      <img :src="store.pic" alt="" class="pic" />
      <div class="play-btn">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
    </div>
    <div class="list">
      <ul>
        <li
          v-for="(item, index) in store.singersongList"
          :key="item.id"
          class="li"
          @click="goTosinger(item, index)"
        >
          <!-- {{ item.name }} -->
          <div class="div1">{{ item.name }}</div>
          <!-- {{ item.singer }} -->
          <div class="div2">{{ item.singer }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue';
// import { ref } from 'vue';
import router from '@/router';
import { useSingerStore } from '@/store';
import { computed } from 'vue';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant';
// const show = inject('show');
// console.log(show);
const miniFullScreen = computed(() => store.miniFullScreen);
const store = useSingerStore();
const title = computed(() => {
  if (!store.title) {
    return storage.get(SINGER_KEY);
  } else {
    return store.title;
  }
});
const goback = () => {
  store.show = !store.show;
  router.back();
};
const goTosinger = (item, index) => {
  if (miniFullScreen.value) {
    store.miniFullScreen = false;
  }
  store.currentIndex = index;
  console.log(store.singerDetail);
  store.sequenceList = store.singerDetail.slice();
  // console.log(item, index);
  store.fullScreen = !store.fullScreen;
  store.playNow = true;
  store.currentSong = item;
};
</script>
<style lang="scss" scoped>
// .music-list {
//   position: relative;
//   height: 100%;
.div1 {
  padding-bottom: 10px;
  font-size: 20px;
}
.div2 {
  color: $color-text-d;
}
.li {
  height: 50px;
  padding-bottom: 30px;
}
.list {
  padding: 40px;
}
.back {
  position: absolute;
  top: 0;
  left: 6px;
  z-index: 20;
  transform: translateZ(2px);
  .icon-back {
    display: block;
    padding: 10px;
    font-size: $font-size-large-x;
    color: $color-theme;
  }
}
.pic {
  width: 100%;
  height: 300px;
}
.title {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  z-index: 20;
  transform: translateZ(2px);
  @include no-wrap();
  text-align: center;
  line-height: 40px;
  font-size: $font-size-large;
  color: $color-text;
}
//   .bg-image {
//     position: relative;
//     width: 100%;
//     transform-origin: top;
//     background-size: cover;
//     .play-btn-wrapper {
//       position: absolute;
//       bottom: 20px;
//       z-index: 10;
//       width: 100%;
.play-btn {
  position: absolute;
  box-sizing: border-box;
  top: 220px;
  left: 33%;
  width: 135px;
  padding: 7px 0;
  // margin: 0 auto;
  text-align: center;
  border: 1px solid $color-theme;
  color: $color-theme;
  border-radius: 100px;
  font-size: 0;
}
.icon-play {
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  font-size: $font-size-medium-x;
}
.text {
  display: inline-block;
  vertical-align: middle;
  font-size: $font-size-small;
}
</style>
