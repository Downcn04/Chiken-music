import { computed } from 'vue';
export default function useShortcut(props, lineHeight) {
  const ANCORN_HEIGHT = 18;
  const shortcutList = computed(() => {
    return props.value.map((item) => item.title);
  });
  const touch = {};
  const onShortcutTouchStart = (e) => {
    // console.log(e.target.dataset.index);
    // console.log(lineHeight.value);
    // document.body.scrollTop = lineHeight.value[e.target.dataset.index] + 1;
    // window.screenY = lineHeight.value[e.target.dataset.index];
    window.scrollTo(0, lineHeight.value[e.target.dataset.index] + 1);
    // console.log(lineHeight);
    // console.log(lineHeight.value[e.target.dataset.index] + 1);
    // clientX.value = e.target.dataset.index;
    touch.y1 = e.touches[0].clientY;
    // console.log(clientX.value);
    // console.log(e.touches[0].target.dataset);
    // clientX.value = e.touches[0].clientY;
  };
  const onShortcutTouchMove = (e) => {
    // console.log(e);
    touch.y2 = e.touches[0].clientY;
    console.log(touch.y2);
    console.log('--------');
    console.log(touch.y1);
    // console.log(e.target.dataset.index);
    const deltaY = Math.floor((touch.y2 - touch.y1) / ANCORN_HEIGHT);
    // y3在此时指所要滑动的index
    touch.y3 = parseInt(e.target.dataset.index + deltaY);
    // console.log(touch.y3);
    console.log(e.target.dataset.index);
    // console.log(lineHeight.value[touch.y3]);
    // console.log(lineHeight);
    // console.log(parseInt(e.target.dataset.index + deltaY));
    window.scrollTo(
      0,
      lineHeight.value[parseInt(e.target.dataset.index + deltaY) + 1],
    );
    // console.log(deltaY.value);
    // console.log(deltaY + lineHeight.value[e.target.dataset.index]);
    // console.log(deltaY);
    // window.scrollTo(0, lineHeight.value[e.target.dataset.index + deltaY]);
    // clientY.value = e.touches;
    // console.log(clientY.value);
    // console.log(e.touches[0].pageY);
    // const deltaY = e.touches[0].clientY - clientX.value;
    // window.scrollTo(0, deltaY + lineHeight.value[e.target.dataset.index] + 1);
  };
  // const shortList = shortcutList.value;
  // console.log(shortcutList.value);
  return { shortcutList, onShortcutTouchStart, onShortcutTouchMove };
}
