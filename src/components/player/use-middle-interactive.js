import { ref } from 'vue';
export default function useMiddleinteractive() {
  const currentShow = ref('cd');
  const touch = {};
  const middleLeftstyle = ref(null);
  const middleRightstyle = ref(null);
  let currentView = 'cd';
  const onMiddletouchStart = (e) => {
    console.log(e.touches[0]);
    touch.start = e.touches[0].pageX;
  };
  const onMiddletouchMove = (e) => {
    if (currentView === 'cd') {
      console.log(e.touches[0].pageX, touch.start);
      touch.delta = touch.start - e.touches[0].pageX;
      // 计算滑动所占窗口比例
      touch.avar = touch.delta / window.innerWidth;
      const opacityNum = 1 - touch.avar;
      const offsetWidth = 0 - touch.delta;
      touch.offsetWidth = offsetWidth;
      middleLeftstyle.value = {
        opacity: opacityNum,
      };
      middleRightstyle.value = {
        transform: `translate3D(${offsetWidth}px,0,0)`,
      };
    } else {
      touch.delta = e.touches[0].pageX - touch.start;
      console.log(touch.delta);
      touch.avar = touch.delta / window.innerWidth;
      const opacityNum = touch.avar;
      const offsetWidth = touch.offsetWidth + touch.delta;
      console.log(opacityNum, offsetWidth);
      middleLeftstyle.value = {
        opacity: opacityNum,
      };
      middleRightstyle.value = {
        transform: `translate3D(${offsetWidth}px,0,0)`,
      };
    }
    // console.log(middleRightstyle.value);
  };
  const onMiddletouchEnd = () => {
    if (currentView === 'cd') {
      if (touch.avar > 0.8) {
        middleLeftstyle.value = {
          opacity: 0,
        };
        const offsetWidth = -window.innerWidth;
        middleRightstyle.value = {
          transform: `translate3D(${offsetWidth}px,0,0)`,
        };
        currentView = 'lyric';
        currentShow.value = 'lyric';
      } else {
        middleLeftstyle.value = {
          opacity: 1,
        };
        // const offsetWidth = -window.innerWidth;
        middleRightstyle.value = {
          transform: `translate3D(0,0,0)`,
        };
      }
    } else {
      if (touch.avar > 0.2) {
        middleLeftstyle.value = {
          opacity: 1,
        };
        middleRightstyle.value = {
          transform: `translate3D(0,0,0)`,
        };
        currentView = 'cd';
        currentShow.value = 'cd';
      }
    }
  };
  return {
    currentShow,
    middleLeftstyle,
    middleRightstyle,
    onMiddletouchStart,
    onMiddletouchMove,
    onMiddletouchEnd,
  };
}
