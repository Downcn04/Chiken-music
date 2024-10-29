<template>
  <div class="loading">
    <div class="loading-content">
      <img width="24" height="24" src="./loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// export default {
//   name: 'loading',
//   data() {
//     return {
//       title: '正在载入...',
//     };
//   },
//   methods: {
//     setTitle(title) {
//       this.title = title;
//     },
//   },
// };
const title = ref('正在载入...');

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
<!-- <style lang="scss" scoped>
.loading {
  position: relative;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
}
</style> -->
