<template>
  <div class="singer-list">
    <ul v-for="singer in data" :key="singer.title" class="item" ref="groupRef">
      <div class="title">
        <h2 class="title1">{{ singer.title }}</h2>
      </div>
      <li
        v-for="item in singer.list"
        :key="item.id"
        class="list"
        @click="selectItem(item)"
      >
        <img :src="item.pic" alt="" />
        <h3 class="name">{{ item.name }}</h3>
      </li>
    </ul>
  </div>
  <div
    class="shortcut"
    @touchstart.stop.prevent="onShortcutTouchStart"
    @touchmove.stop.prevent="onShortcutTouchMove"
  >
    <ul>
      <li
        v-for="(item, index) in shortcutList"
        :key="item"
        :data-index="index"
        class="item"
        :class="{ current: currentIndex === index }"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup>
// import { ref } from 'vue';
import useFixed from './use-fixed';
import useShortcut from './use-shortcut';
import { defineProps, ref, defineEmits } from 'vue';
const props = defineProps(['singers']);
// console.log(props.singers);
const data = ref(props.singers);
// const groupRef = ref();
console.log(data.value);
const { groupRef, currentIndex, lineHeight } = useFixed(data);
const { shortcutList, onShortcutTouchStart, onShortcutTouchMove } = useShortcut(
  data,
  lineHeight,
);
//  将所选择的歌手传给父组件
const emits = defineEmits(['select']);
const selectItem = (item) => {
  emits('select', item);
};
</script>

<style lang="scss" scoped>
.singer-list {
  .title {
    // position: relative;
    width: 100%;
    // margin-bottom: 3%;
    color: $color-text-d;
    line-height: 30px;
    background-color: $color-highlight-background;
  }
  .title1 {
    margin-left: 3%;
  }
  .list {
    display: flex;
    color: $color-text-l;
    margin-left: 8%;
    align-items: center;
    padding: 5px 0;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .name {
      margin-left: 30px;
    }
  }
}
.shortcut {
  position: fixed;
  right: 4px;
  top: 25%;
  // transform: translateY(-50%);
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
