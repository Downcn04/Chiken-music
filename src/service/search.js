import { get } from './base';
export const getsingerList = () => {
  return get('/api/getSingerList');
};
export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer,
  });
}
export function getHotKeys() {
  return get('/api/getHotKeys');
}
export function search(query, page, showSinger) {
  return get('/api/search', {
    query,
    page,
    showSinger,
  });
}
