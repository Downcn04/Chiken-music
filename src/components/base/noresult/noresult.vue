<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./no-result@2x.png" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const title = ref('没有搜索结果');

// eslint-disable-next-line
const setTitle = (title) => {
  title.value = title;
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 50%;
  margin-top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    top: 50%;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>
