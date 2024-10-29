import { computed, ref, watch } from 'vue';
import { getLyric } from '@/service/song';
import { useSingerStore } from '@/store';
import Lyric from 'lyric-parser';

export default function useLyric({ currentTime, onReady }) {
  const scrollRef = ref();
  const lyricListRef = ref();
  const songlyric = ref(null);
  const lineNumber = ref(0);
  const nowlyrictxt = ref('');
  const store = useSingerStore();
  const song = computed(() => store.currentSong);
  const time = computed(() => currentTime.value);
  watch(song, async () => {
    const result = await getLyric('002B2EAA3brD5b');
    stopLyric();
    lineNumber.value = 0;
    lyricListRef.value = '';
    songlyric.value = new Lyric(result, handleLyric);
    if (onReady) {
      playLyric();
    }
  });

  const handleLyric = ({ lineNum, txt }) => {
    lineNumber.value = lineNum;
    // console.log(scrollRef.value.scroll);
    const listEl = lyricListRef.value;
    const scrollComp = scrollRef.value;
    nowlyrictxt.value = txt;
    if (lineNum > 5) {
      const lineEl = listEl.children[lineNum - 5];
      scrollComp.scroll.scrollToElement(lineEl, 1000);
    } else {
      scrollComp.scroll.scrollTo(0, 0, 1000);
    }
    // if (lineNumber.value > 5) {
    //   const childEl = lyricListRef.value.children[lineNum - 1];
    //   // const childEl = lyricListRef.value.c[lineNum];
    //   // console.log(childEl);
    //   scrollRef.value.scroll.scrollToElement(childEl, 1000);
    // } else {
    //   scrollRef.value.scroll.scrollTo(0, 0, 0);
    // } scrollRef.value.scroll.scrollTo(0, 0, 0);
  };
  // watch(currentTime, () => {
  //   playLyric();
  // });
  function playLyric() {
    const currentLyricVal = songlyric.value;
    if (currentLyricVal) {
      currentLyricVal.seek(time.value * 1000);
    }
    // scrollRef.value.scrollTo(0, 100);
  }
  // setInterval(() => {
  //   console.log(currentTime);
  // }, 1000);
  // watch(currentTime, () => {
  //   songlyric.value.seek(currentTime);
  // });
  function stopLyric() {
    const currentLyricVal = songlyric.value;
    if (currentLyricVal) {
      currentLyricVal.stop();
    }
  }
  return {
    songlyric,
    lineNumber,
    playLyric,
    scrollRef,
    lyricListRef,
    stopLyric,
    nowlyrictxt,
  };
}
