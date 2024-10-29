<template>
  <div class="player">
    <!-- <div class="pop"></div> -->
    <div class="normal-player" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.pic" alt="" />
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back" @click="goback"></i>
        </div>
        <h1 class="title">{{ currentSong.name }}</h1>
        <h2 class="subtitle">{{ currentSong.singer }}</h2>
      </div>
      <div
        class="middle"
        @touchstart.prevent="onMiddletouchStart"
        @touchmove.prevent="onMiddletouchMove"
        @touchend.prevent="onMiddletouchEnd"
      >
        <div class="middle-l" :style="middleLeftstyle">
          <div ref="cdWrapperRef" class="cd-wrapper">
            <div ref="cdRef" class="cd">
              <img
                ref="cdImageRef"
                class="image"
                :class="cdCls"
                :src="currentSong.pic"
              />
            </div>
          </div>
          <div class="playing-lyric-wrapper">
            <div class="playing-lyric">{{ nowlyrictxt }}</div>
          </div>
        </div>
        <Scroll class="middle-r" ref="scrollRef" :style="middleRightstyle">
          <div class="lyric-wrapper">
            <div v-if="songlyric" ref="lyricListRef">
              <p
                class="text"
                :class="{ current: lineNumber === index }"
                v-for="(line, index) in songlyric.lines"
                :key="line.num"
              >
                {{ line.txt }}
              </p>
            </div>
            <!-- <div class="pure-music" v-show="pureMusicLyric">
              <p>{{ pureMusicLyric }}</p>
            </div> -->
          </div>
        </Scroll>
      </div>
      <div class="bottom">
        <div class="progress-bar-wrapper">
          <Bar
            :currentTime="currentTime"
            @offsetall="updatetime"
            ref="bar"
          ></Bar>
        </div>
        <div class="dot-wrapper">
          <span class="dot" :class="{ active: currentShow === 'cd' }"></span>
          <span class="dot" :class="{ active: currentShow === 'lyric' }"></span>
        </div>
        <div class="operators">
          <div class="icon i-left">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon i-left">
            <i class="icon-prev" @click="prev" :class="disableCl"></i>
          </div>
          <div class="icon i-center">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon i-right">
            <i class="icon-next" @click="next" :class="disableCl"></i>
          </div>
          <div class="icon i-right">
            <i
              :class="getfavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <audio
      ref="audioRef"
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="timeupDate"
    ></audio>
    <mini-player
      :currentTime="currentTime"
      ref="sliderWrapperRef"
    ></mini-player>
  </div>
</template>
<script setup>
import useMiniSlider from './use-mini-slider';
import miniPlayer from './mini-player.vue';
import Bar from '@/components/player/progress-bar.vue';
import { computed, watch, ref, nextTick } from 'vue';
import Scroll from '@/components/base/scroll/scroll';
import { useSingerStore } from '@/store';
import useMode from './use-mode';
import useFavorite from './use-favorite';
import useCd from './use-cd';
import useLyric from './use-lyric';
import useMiddleinteractive from './use-middle-interactive';
const currentTime = ref(0);
const onReady = ref(false);
const bar = ref();
// 引入hooks
const {
  currentShow,
  middleLeftstyle,
  middleRightstyle,
  onMiddletouchStart,
  onMiddletouchMove,
  onMiddletouchEnd,
} = useMiddleinteractive();
const { sliderWrapperRef } = useMiniSlider();
const { cdCls, cdRef, cdImageRef } = useCd();
const { modeIcon, changeMode } = useMode();
const { getfavoriteIcon, toggleFavorite } = useFavorite();
const {
  songlyric,
  lineNumber,
  playLyric,
  scrollRef,
  lyricListRef,
  stopLyric,
  nowlyrictxt,
} = useLyric({
  currentTime,
  onReady,
});
// debugger;
// console.log(lyric);
// watch(lyric, () => {
//   console.log(lyric);
// });
// setInterval(() => {
//   console.log(songlyric);
//   console.log(lineNumber);
// }, 1000);
const goback = () => {
  useStore.miniFullScreen = true;
  useStore.fullScreen = false;
};
const audioRef = ref();
// const useStore = useCounterStore();
const useStore = useSingerStore();
const fullScreen = computed(() => useStore.fullScreen);
const currentSong = computed(() => useStore.currentSong);
const playing = computed(() => useStore.playNow);
const totalTime = ref(273);
const progress = computed(() => currentTime.value / totalTime.value);
// import { ref, reactive } from 'vue';
// const time = computed(() => props.currentTime);
const playIcon = computed(() => {
  return playing.value ? 'icon-pause' : 'icon-play';
});
const error = () => {
  onReady.value = true;
};
const disableCl = computed(() => {
  return onReady.value ? '' : 'disable';
});
const ready = () => {
  if (onReady.value) {
    return;
  }
  onReady.value = true;
  playLyric();
};
watch(currentSong, (newSong) => {
  if (!newSong.id || !newSong.url) {
    return;
  }
  // if (newSong.length === 0) {
  //   audioRef.value.pause();
  // }
  // 解决报错
  onReady.value = false;
  // if()
  audioRef.value.src = newSong.url;
  console.log(newSong.url);
  audioRef.value.play();
});
watch(playing, (newPlaying) => {
  // 解决刚开始报错的过程
  if (!onReady.value) {
    return;
  }
  if (newPlaying) {
    playLyric();
  }
  if (!newPlaying) {
    stopLyric();
  }
  newPlaying ? audioRef.value.play() : audioRef.value.pause();
});
const togglePlay = () => {
  useStore.playNow = !useStore.playNow;
};
const pause = () => {
  useStore.playNow = false;
};
const prev = () => {
  // 解决报错
  if (!onReady.value) {
    return;
  }
  console.log(1111);
  useStore.currentIndex--;
  if (useStore.currentIndex === -1) {
    useStore.currentIndex++;
    audioRef.value.play();
  }
  useStore.currentSong = useStore.singerDetail[useStore.currentIndex];
  audioRef.value.play();
};
const next = () => {
  if (!onReady.value) {
    return;
  }
  // console.log(useStore.singerDetail.length);
  if (useStore.currentIndex === useStore.singerDetail.length - 1) {
    audioRef.value.play();
  } else {
    useStore.currentIndex++;
    useStore.currentSong = useStore.singerDetail[useStore.currentIndex];
    audioRef.value.play();
    useStore.playNow = true;
  }
};
const timeupDate = (e) => {
  // console.log(e);
  currentTime.value = e.target.currentTime;
};
// watch(alloffset, (old, newvalue) => {
//   console.log(newvalue);
// });
// setInterval(() => {
//   console.log(alloffset);
// }, 1000);
const updatetime = (value) => {
  // if (value) {
  //   audioRef.value.currentTime = value * 0.97;
  // }
  // console.log(value);
};
// setInterval(() => {
//   updatetime();
// }, 1000);
// 当你需要在数据变化之后等待 DOM 更新完成时，使用 nextTick
watch(fullScreen, async (newvalue) => {
  // console.log(newvalue);
  if (newvalue) {
    await nextTick();
    // console.log(bar.value.calculate);
    bar.value.calculate(progress.value);
  }
});
</script>
<style lang="scss" scoped>
// .pop {
//   position: absolute;
//   height: 200px;
//   width: 200px;
//   left: 40px;
//   height: 40px;
//   background-color: black;
//   z-index: 1000;
// }
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 150;
    background: $color-background;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }
      .icon-back {
        display: block;
        padding: 9px;
        font-size: $font-size-large-x;
        color: $color-theme;
        transform: rotate(-90deg);
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        @include no-wrap();
        font-size: $font-size-large;
        color: $color-text;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-text;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .txt {
          width: 100%;
          text-align: center;
          height: 100%;
          color: $color-text-l;
          background-color: black;
        }
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid rgba(255, 255, 255, 0.1);
            }
            .playing {
              animation: rotate 20s linear infinite;
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text-l;
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
            &.current {
              color: $color-text;
            }
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: $color-text-l;
            font-size: $font-size-medium;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0px auto;
        padding: 10px 0;
        .time {
          color: $color-text;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
        .i-left {
          text-align: right;
        }
        .i-center {
          padding: 0 20px;
          text-align: center;
          i {
            font-size: 40px;
          }
        }
        .i-right {
          text-align: left;
        }
        .icon-favorite {
          color: $color-sub-theme;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.6s;
      .top,
      .bottom {
        transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
      }
    }
    &.normal-enter-from,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
}
</style>
