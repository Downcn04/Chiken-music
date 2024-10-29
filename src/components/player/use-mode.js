import { PLAY_MODE } from '@/assets/js/constant';
import { useSingerStore } from '@/store';
import { computed } from 'vue';
import { shuffleArray } from '@/assets/js/utils';
export default function useMode() {
  const store = useSingerStore();
  const mode = computed(() => store.playMode);
  // const playList = computed(() => store.singerDetail);
  const sequenceList = computed(() => store.sequenceList);
  const changeMode = () => {
    // const p = shuffle(playList);
    // console.log(p);
    // const p = shuffle([1, 5, 3, 2, 1]);
    // store.singerDetail = store.sequenceList;
    // console.log(store.singerDetail);
    store.playMode++;
    // console.log(mode.value % 3 === PLAY_MODE.sequence);
    // console.log(modeIcon.value);
    if (store.playMode % 3 === PLAY_MODE.sequence) {
      store.singerDetail = store.sequenceList;
      console.log(store.singerDetail);
      // store.sequenceList = store.singerDetail;
    } else if (store.playMode % 3 === PLAY_MODE.random) {
      console.log(store.singerDetail);
      // console.log(sequenceList);
      console.log(shuffleArray(sequenceList.value));
      const array1 = shuffleArray(store.sequenceList);
      console.log(array1);
    } else {
      // console.log(store.singerDetail);

      store.singerDetail = sequenceList.value[0];
      console.log(store.singerDetail);
    }
  };

  const modeIcon = computed(() => {
    return mode.value % 3 === PLAY_MODE.sequence
      ? 'icon-sequence'
      : mode.value % 3 === PLAY_MODE.loop
        ? 'icon-loop'
        : 'icon-random';
  });
  const modeText = computed(() => {
    return mode.value % 3 === PLAY_MODE.sequence
      ? '顺序播放'
      : mode.value % 3 === PLAY_MODE.loop
        ? '单曲循环'
        : '随机播放';
  });

  return { modeIcon, changeMode, modeText };
}
