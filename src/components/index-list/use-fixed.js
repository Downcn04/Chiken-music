import { ref, onMounted, onUnmounted } from 'vue';
// TODO:降低时间复杂度
export default function useFixed(data) {
  const groupRef = ref();
  const lineHeightBefore = ref([]);
  const lineHeight = ref([]);
  const currentIndex = ref(0);
  const handleScroll = () => {
    // console.log(groupRef.value[0]);
    // console.log(window.scrollY);
    const teer = ref('');

    for (let i = 0; i < lineHeight.value.length; i++) {
      if (window.scrollY > lineHeight.value[i]) {
        teer.value = groupRef.value[i].children[0].children[0];
        currentIndex.value = i;
      }
    }
    for (let j = 0; j < groupRef.value.length; j++) {
      if (groupRef.value[j].children[0].children[0] === teer.value) {
        console.log(groupRef.value[j].children[0]);
        groupRef.value[j].children[0].classList.add('banner');
        // console.log(11);
      } else {
        // groupRef.value[j].children[0].children[0].style.position = 'static';
        groupRef.value[j].children[0].classList.remove('banner');
      }
    }
    console.log(lineHeight.value);
  };

  onMounted(() => {
    // groupRef.value[0].children[0].classList.add('banner');
    for (let i = 0; i < groupRef.value.length; i++) {
      lineHeightBefore.value.push(groupRef.value[i].getBoundingClientRect().y);
      lineHeight.value.push(lineHeightBefore.value[i] - 44);
    }
    console.log(lineHeight.value);

    window.addEventListener('scroll', handleScroll);
  });
  console.log(lineHeight.value);

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return { groupRef, currentIndex, lineHeight };
}
