import { get } from './base';

export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id,
  });
}
