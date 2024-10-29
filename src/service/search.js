import { get } from './base';
export const getsingerList = () => {
  return get('/api/getSingerList');
};
export function getSingerDetail(singer) {
  return get('/api/getSingerDetail', {
    mid: singer,
  });
}
