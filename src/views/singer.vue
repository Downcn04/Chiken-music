<template>
  <div class="singer" v-loading="loading">
    <indexList :singers="singers" v-if="isShow" @select="onSelect"></indexList>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { getsingerList, getSingerDetail } from '@/service/search';
import { computed, onMounted, provide, ref } from 'vue';
import indexList from '@/components/index-list/index-list.vue';
import { useRouter } from 'vue-router';
import { useCounterStore, useSingerStore } from '@/store';
import storage from 'good-storage';
import { SINGER_KEY } from '@/assets/js/constant';
// import SingerDetail from './singer-detail.vue';
const singerStore = useSingerStore();
const singerMid = ref(null);
const singers = ref([]);
const singerPic = ref('');
const loading = computed(() => !singers.value.length);
const singerName = ref('');
const store = useCounterStore();
const goToext = ref(false);
const isShow = computed(() => {
  if (!goToext.value && singers.value.length) {
    return true;
  } else {
    return false;
  }
});
store.mid = singerMid.value;
store.pic = singerPic.value;
store.title = singerName.value;
provide('show', goToext.value);
onMounted(async () => {
  const result = await getsingerList();
  singers.value = result.singers;
  console.log(singers);
  console.log(result);
});
const router = useRouter();
const onSelect = async (data) => {
  goToext.value = !goToext.value;
  console.log(data);
  singerStore.mid = data.mid;
  singerStore.title = data.name;
  singerStore.pic = data.pic;
  console.log(singerName.value);
  store.show = !store.show;
  const result = await getSingerDetail(singerStore.mid);
  console.log(result.songs);
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
  // console.log(singerStore.singerDetail);
  // 在这个位置中像仓库中赋值没问题
  // store.showdetail = result.songs;
  console.log(`/singer/${singerMid.value}`);
  // window.screenTop = 0;
  storage.session.set(SINGER_KEY, data);
  router.push({
    path: `/singer/${data.mid}`,
  });
};
</script>
<style scoped>
.singer {
  /* position: fixed; */
  width: 100%;
  /* top: 88px; */
  bottom: 0;
}
</style>
