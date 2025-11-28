'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import React, { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { FiClipboard, FiGrid, FiMenu, FiSettings } from 'react-icons/fi';
import './style.css';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/store/auth/actions';

const MenuNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/entrar');
  };

  return (
    <section>
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside
          className={`
            fixed top-0 left-0 h-screen bg-gradient-to-bl from-pink-700 to-purple-700
            transition-all duration-300 ease-in-out
            ${open ? 'w-[250px]' : 'w-0'}
            overflow-hidden
          `}
        >
          <div className="px-6">
            <div className="pt-5">
              <img src="/img/logo.png" alt="Logo" />
            </div>
            <Divider />

            <ul>
              <li className="text-white rounded-2xl mb-3.5">
                <Link
                  href="/dashboard"
                  className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl"
                >
                  <FiGrid />
                  Dashboard
                </Link>
              </li>

              <li className="text-white rounded-2xl mb-3.5">
                <Link
                  href="/promocoes"
                  className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl"
                >
                  <FiClipboard />
                  Promoções
                </Link>
              </li>

              <li className="text-white mb-3.5">
                <div className="flex items-center px-5 py-1 gap-2">
                  <FiSettings />
                  Configuração
                </div>
                <ul className="ml-3.5">
                  <li>
                    <Link
                      href="/configuracoes/usuarios"
                      className="flex items-center px-5 py-1 gap-2 hover:font-bold"
                    >
                      <BsDot />
                      Usuários
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>

        {/* CONTEÚDO */}
        <main
          className={`
            flex-1 transition-all duration-300
            ${open ? 'ml-[250px]' : 'ml-0'}
          `}
        >
          <header className="px-6 py-2 shadow-md flex justify-between items-center">
            <Button text onClick={() => setOpen(!open)}>
              <FiMenu className="text-2xl" />
            </Button>

            <Button severity="secondary" text onClick={handleLogout}>
              Sair
            </Button>
          </header>

          <div className="px-6 pb-6 mt-8">
            <Card className="shadow-md">{children}</Card>
          </div>
        </main>
      </div>
    </section>
  );
};

export default MenuNav;
