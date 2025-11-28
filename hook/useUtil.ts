const URL_LINK = 'http://localhost:4000/';

export function useImg(link?: string | null): string {
  if (!link) return '';
  return URL_LINK + link;
}

export function isPdf(link?: string | null): boolean {
  if (!link) return false;
  return link.toLowerCase().endsWith('.pdf');
}

export function useLink(link?: string | null): string {
  if (!link) return '';
  return URL_LINK + link;
}
