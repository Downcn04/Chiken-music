import { computed } from 'vue';
import { useSingerStore } from '@/store';
// import { useSingerStore } from '@/store';

export default function useFavorite() {
  const store = useSingerStore();
  const favoriteList = computed(() => store.favoriteList);
  const getfavoriteIcon = (song) => {
    if (isFavorite(song)) return 'icon-favorite';
    else {
      return 'icon-not-favorite';
    }
  };
  const toggleFavorite = (song) => {
    if (isFavorite(song)) {
      store.favoriteList.splice(store.favoriteList.indexOf(song), 1);
    } else {
      store.favoriteList.push(song);
    }
  };
  const isFavorite = (song) => {
    if (favoriteList.value.findIndex((item) => item.id === song.id) > -1)
      return true;
    else return false;
  };
  return { getfavoriteIcon, toggleFavorite };
}
