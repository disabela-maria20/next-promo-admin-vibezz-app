const URL_LINK = 'http://localhost:4000/';

export function useImg(link: string) {
  if (!link) return;
  return URL_LINK + link;
}
