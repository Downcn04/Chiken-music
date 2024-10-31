<template>
  <div class="top-list" v-loading="loading">
    <div class="top-list-content" v-if="a">
      <ul>
        <li
          class="item"
          v-for="item in topList"
          :key="item.id"
          @click="selectItem(item)"
        >
          <div class="icon">
            <img width="100" height="100" v-lazy="item.pic" />
          </div>
          <ul class="song-list">
            <li
              class="song"
              v-for="(song, index) in item.songList"
              :key="song.id"
            >
              <span>{{ index + 1 }}. </span>
              <span>{{ song.songName }}-{{ song.singerName }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="songs" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
// import scroll from '@/components/base/scroll/scroll.vue';
import { getTopList, getTopDetail } from '@/service/top-list';
import { useSingerStore } from '@/store';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const singerStore = useSingerStore();
const a = ref(true);
const router = useRouter();
const songs = ref([]);
const topList = ref([]);
const loading = computed(() => !topList.value.length);
onMounted(async () => {
  const result = await getTopList();
  topList.value = result.topList;
});
const selectItem = async (item) => {
  const result = await getTopDetail(item);
  singerStore.singersonList = result.songs;
  singerStore.pic = item.pic;
  songs.value = result.songList;
  const songMid = ref();
  songMid.value = result.songs;
  // 接口失效 在这里增加固定的url
  for (const item of songMid.value) {
    // console.log(item);
    item.url = 'http://music.163.com/song/media/outer/url?id=25906124.mp3';
  }
  console.log(songMid.value);
  // 深浅拷贝
  singerStore.singerDetail = songMid.value.slice();
  singerStore.singersongList = songMid.value.slice();
  a.value = false;
  singerStore.show = !singerStore.show;
  router.push(`/top-list/${item.id}`);
};
</script>

<style lang="scss" scoped>
.top-list {
  // position: absolute;
  // top: 50%;
  left: 0;
  width: 100%;
  .top-list-content {
    height: 100%;
    .item {
      height: 20%;
      display: flex;
      margin: 20px;
      background-color: $color-highlight-background;
      .song-list {
        display: flex;
        flex-direction: column;
      }
      .song {
        flex: 1;
        display: flex;
        align-items: center;
        color: $color-text-l;
      }
    }
  }
}
</style>
