<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div class="slider-page" v-for="item in props.sliders" :key="item.id">
        <a :href="item.link">
          <img :src="item.pic" />
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in props.sliders"
        :key="item.id"
        :class="{ active: currentPageIndex === index }"
      >
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import useSlider from './use-slider';

const rootRef = ref();
const props = defineProps(['sliders']);
console.log(props.sliders);
const { currentPageIndex } = useSlider(rootRef);
console.log(currentPageIndex.value);
</script>

<style lang="scss" scoped>
.slider {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  height: var(--parent-height);
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;

    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        backgroud: $color-text-ll;
      }
    }
  }
}
.shortcut {
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: $color-background-d;
  font-family: Helvetica;
  .item {
    padding: 3px;
    line-height: 1;
    color: $color-text-l;
    font-size: $font-size-small;
    &.current {
      color: $color-theme;
    }
  }
}
</style>
