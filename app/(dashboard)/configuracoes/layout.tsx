import MenuNav from '@/component/menu';
import { ReactNode } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MenuNav>{children}</MenuNav>;
}
