import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useCounterStore = defineStore('counter', () => {
  const show = ref(true);
  // const showdetail = reactive([]);

  return { show };
});
export const useSingerStore = defineStore('Singer', () => {
  const fullScreen = ref(false);
  // 歌手歌曲列表
  const singersonList = ref([]);
  // 播放列表
  const singerDetail = ref([]);
  const sequenceList = ref([]);
  const title = ref('');
  const cancelConfirm = ref(false);
  const pic = ref('');
  const mid = ref('');
  const currentSong = ref([]);
  const playNow = ref(false);
  const currentIndex = ref();
  const playMode = ref(0);
  const favoriteList = ref([]);
  // 小列表展示
  const miniListShow = ref(false);
  // 小窗口显示
  const miniFullScreen = ref(false);
  const removeList = (song, list) => {
    const index = list.findIndex((item) => {
      return song.id === item.id;
    });
    if (index !== currentIndex.value) {
      list.splice(index, 1);
      // console.log(1);
      return 0;
    } else {
      if (index === list.length - 1) {
        list.splice(index, 1);
        currentIndex.value--;
        currentSong.value = list[currentIndex.value];
        console.log(2);
      } else {
        list.splice(index, 1);
        currentIndex.value++;
        currentSong.value = list[currentIndex.value];
        // console.log(currentSong.value, currentIndex.value);
        console.log(3);
      }
    }
  };
  const removePlayList = (song) => {
    removeList(song, sequenceList.value);
    // 逻辑有误
    currentIndex.value++;
  };
  const removeSingerList = (song) => {
    removeList(song, singerDetail.value);
  };
  return {
    fullScreen,
    miniFullScreen,
    singerDetail,
    title,
    pic,
    mid,
    currentSong,
    playNow,
    currentIndex,
    playMode,
    sequenceList,
    favoriteList,
    miniListShow,
    removeList,
    removePlayList,
    removeSingerList,
    singersonList,
    cancelConfirm,
  };
});
