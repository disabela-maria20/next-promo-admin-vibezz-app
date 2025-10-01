'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (!token) {
      router.replace('/entrar');
    }
  }, [token, router]);

  if (!token) return null;

  return <>{children}</>;
}
