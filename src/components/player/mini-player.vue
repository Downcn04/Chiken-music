<template>
  <transition name="mini">
    <div class="mini-player" v-show="miniFullScreen" @click="showNormal">
      <div class="cd-wrapper">
        <div ref="cdRef" class="cd">
          <img
            ref="cdImageRef"
            width="40"
            height="40"
            :src="currentSong.pic"
            :class="cdCls"
          />
        </div>
      </div>
      <div ref="sliderWrapperRef" class="slider-wrapper">
        <div class="slider-group">
          <div class="slider-page" v-for="song in playList" :key="song.id">
            <h2 class="name">{{ song.name }}</h2>
            <p class="desc">{{ song.singer }}</p>
          </div>
        </div>
      </div>
      <div class="control">
        <progress-circle :radius="32" :progress="progress">
          <i
            class="icon-mini"
            :class="miniPlayIcon"
            @click.stop="togglePlay"
          ></i>
        </progress-circle>
      </div>
      <div class="control">
        <i class="icon-playlist" @click.stop="showMiniList"></i>
      </div>
      <playlist ref="playlistRef"></playlist>
    </div>
  </transition>
</template>

<script setup>
import playlist from './playlist.vue';
import { useSingerStore } from '@/store';
import { computed, defineProps, ref } from 'vue';
import useCd from './use-cd';
import progressCircle from './progress-circle.vue';
import useMiniSlider from './use-mini-slider';
const singerStore = useSingerStore();
// const sliderWrapperRef = ref(null);
const { sliderWrapperRef } = useMiniSlider();
const currentSong = computed(() => singerStore.currentSong);
const miniFullScreen = computed(() => singerStore.miniFullScreen);
const playList = computed(() => singerStore.singerDetail);
const miniPlayIcon = computed(() =>
  singerStore.playNow ? 'icon-pause' : 'icon-play',
);
// const singerDetail = computed(() => singerStore.singerDetail);
const props = defineProps(['currentTime']);
const time = computed(() => props.currentTime);
// 无法正常获取数据 固定数据
const totalTime = ref(273);
const progress = computed(() => time.value / totalTime.value);
const showNormal = () => {
  singerStore.miniFullScreen = false;
  singerStore.fullScreen = true;
};
const { cdCls, cdRef, cdImageRef } = useCd();
const togglePlay = () => {
  singerStore.playNow = !singerStore.playNow;
};
const showMiniList = () => {
  singerStore.miniListShow = true;
};
</script>

<style lang="scss" scoped>
.mini-player {
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 180;
  width: 100%;
  height: 60px;
  background: $color-highlight-background;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      height: 100%;
      width: 100%;
      img {
        border-radius: 50%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .slider-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        width: 100%;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        .name {
          margin-bottom: 2px;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text;
        }
        .desc {
          @include no-wrap();
          font-size: $font-size-small;
          color: $color-text-d;
        }
      }
    }
  }
  .control {
    flex: 0 0 30px;
    width: 30px;
    padding: 0 10px;
    .icon-playlist {
      position: relative;
      top: -2px;
      font-size: 28px;
      color: $color-theme-d;
    }
    .icon-mini {
      position: absolute;
      left: 0;
      top: 0;
      color: $color-theme-d;
      font-size: 32px;
    }
  }
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
}
</style>
