<template>
  <teleport to="body">
    <transition name="list-fade">
      <div class="playlist" v-show="visible && playlist.length" @click="hide">
        <div class="list-wrapper" @click.stop>
          <div class="list-header">
            <h1 class="title">
              <i class="icon" :class="modeIcon" @click="changeMode"> </i>
              <span class="text">{{ modeText }}</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear" @click="showConfirm"></i>
              </span>
            </h1>
          </div>
          <scroll ref="scrollRef" class="list-content">
            <transition-group ref="listRef" name="list" tag="ul">
              <li
                class="item"
                v-for="song in sequenceList"
                :key="song.id"
                @click="selectItem(song)"
              >
                <i
                  class="current"
                  :class="currentSong.id === song.id ? 'icon-play' : ''"
                ></i>
                <span class="text">{{ song.name }}</span>
                <span class="favorite" @click.stop="toggleFavorite(song)">
                  <i :class="getfavoriteIcon(song)"></i>
                </span>
                <span class="delete" @click.stop="removeSong(song)">
                  <i class="icon-delete"></i>
                </span>
              </li>
            </transition-group>
          </scroll>
          <div class="list-add">
            <div class="add" @click="showAddSong">
              <i class="icon-add"></i>
              <span class="text">添加歌曲到队列</span>
            </div>
          </div>
          <div class="list-footer" @click="hide">
            <span>关闭</span>
          </div>
        </div>
        <confirm
          ref="confirmRef"
          text="是否清空播放列表？"
          confirm-btn-text="清空"
          cancel-btn-text="取消"
        ></confirm>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import confirm from '../base/confirm/confirm.vue';
import { useSingerStore } from '@/store';
import { computed, watch, ref, nextTick } from 'vue';
import scroll from '../base/scroll/scroll.vue';
import useMode from './use-mode';
import useFavorite from './use-favorite';
const { modeIcon, changeMode, modeText } = useMode();
const { getfavoriteIcon, toggleFavorite } = useFavorite();
const singerStore = useSingerStore();
const scrollRef = ref(null);
const listRef = ref(null);
const visible = computed(() => singerStore.miniListShow);
const playlist = computed(() => singerStore.singerDetail);
const currentSong = computed(() => singerStore.currentSong);
const hide = () => {
  singerStore.miniListShow = false;
};
const showConfirm = () => {
  singerStore.cancelConfirm = true;
};
const sequenceList = computed(() => singerStore.sequenceList);
const selectItem = (song) => {
  singerStore.currentSong = song;
};
watch(currentSong, (newVal) => {
  scrollToCurrent(newVal);
});
const scrollToCurrent = async (currentSong) => {
  await nextTick();
  console.log(currentSong);
  // console.log('---------');
  console.log(sequenceList.value);
  const index = sequenceList.value.findIndex((song) => {
    return currentSong.id === song.id;
  });
  if (index === -1) {
    return;
  }
  const target = listRef.value.$el.children[index];
  console.log(target);
  scrollRef.value.scroll.scrollToElement(target, 300);
};
const removeSong = (song) => {
  singerStore.removePlayList(song);
  singerStore.removeSingerList(song);
};
watch(sequenceList.value.length, () => {
  scrollRef.value.refresh();
});
</script>

<style lang="scss" scoped>
.playlist {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active,
  &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter-from,
  &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 210;
    width: 100%;
    background-color: $color-highlight-background;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: 24px;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
          color: $color-theme-d;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .favorite {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-small;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-small;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
        }
      }
    }
    .list-add {
      width: 140px;
      margin: 20px auto 30px auto;
      .add {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        border: 1px solid $color-text-l;
        border-radius: 100px;
        color: $color-text-l;
        .icon-add {
          margin-right: 5px;
          font-size: $font-size-small-s;
        }
        .text {
          font-size: $font-size-small;
        }
      }
    }
    .list-footer {
      text-align: center;
      line-height: 50px;
      background: $color-background;
      font-size: $font-size-medium-x;
      color: $color-text-l;
    }
  }
}
</style>
