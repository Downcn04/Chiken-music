<template>
  <teleport to="body">
    <transition name="confirm-fade">
      <div class="confirm" v-show="visible">
        <div class="confirm-wrapper">
          <div class="confirm-content">
            <p class="text">{{ props.text }}</p>
            <div class="operate">
              <div class="operate-btn left" @click="confirm">
                {{ props.confirmBtnText }}
              </div>
              <div class="operate-btn" @click="cancel">
                {{ props.cancelBtnText }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useSingerStore } from '@/store';
const store = useSingerStore();
const visible = computed(() => store.cancelConfirm);
const props = defineProps({
  text: String,
  confirmBtnText: String,
  cancelBtnText: String,
});
const confirm = () => {
  store.cancelConfirm = false;
  // 清空所有相关信息
  store.miniListShow = false;
  // store.playList = [];
  // await nextTick();
  store.currentIndex = 0;
  store.currentSong = [];
  // store.fullScreen = false;
  store.miniFullScreen = false;
  // store.singerDetail = [];
  store.sequenceList = [];
  // store.miniListShow = false;
  // store.pic = '';
  // store.mid = '';
};
const cancel = () => {
  store.cancelConfirm = false;
};
</script>

<style scoped lang="scss">
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: $color-background-d;
  &.confirm-fade-enter-active {
    animation: confirm-fadein 0.3s;
    .confirm-content {
      animation: confirm-zoom-in 0.3s;
    }
  }
  &.confirm-fade-leave-active {
    animation: confirm-fadeout 0.3s;
    .confirm-content {
      animation: confirm-zoom-out 0.3s;
    }
  }
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: $color-highlight-background;
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text-l;
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-l;
          &.left {
            border-right: 1px solid $color-background-d;
            color: $color-text;
          }
        }
      }
    }
  }
}

@keyframes confirm-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes confirm-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes confirm-zoom-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes confirm-zoom-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
</style>
