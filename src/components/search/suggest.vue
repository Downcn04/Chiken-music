<template>
  <div ref="rootRef" class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text">{{ singer.name }}</p>
        </div>
      </li>
      <li class="suggest-item" v-for="song in songs" :key="song.id">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text">{{ song.singer }}-{{ song.name }}</p>
        </div>
      </li>
      <div class="suggest-item"></div>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, computed, watch, ref } from 'vue';
import { search } from '@/service/search';
const singer = ref('');
const page = ref(1);
const showSinger = ref(true);
const props = defineProps(['query']);
const songs = ref([]);
const query = computed(() => props.query);
watch(query, async (newQuery) => {
  const result = await search(newQuery, page.value, showSinger.value);
  songs.value = result.songs;
  console.log(result);
});
// setInterval(() => {
//   console.log(query.value);
// }, 100);
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .icon {
        flex: 0 0 30px;
        width: 30px;
        [class^='icon-'] {
          font-size: 14px;
          color: $color-text-d;
        }
      }
      .name {
        flex: 1;
        font-size: $font-size-medium;
        color: $color-text-d;
        overflow: hidden;
        .text {
          @include no-wrap();
        }
      }
    }
  }
}
</style>
