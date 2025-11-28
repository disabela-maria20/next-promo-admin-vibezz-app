const URL_LINK = 'http://localhost:4000/';

export function useImg(link: string) {
  if (!link) return;
  return URL_LINK + link;
}

function isPdf(link?: string | null): boolean {
  if (!link) return false;
  return link.toLowerCase().endsWith('.pdf');
}
