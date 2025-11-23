'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import React, { useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { FiClipboard, FiGrid, FiMenu, FiSettings } from 'react-icons/fi';
import './style.css';
import router from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/store/auth/actions';

const MenuNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/entrar');
  };
  return (
    <section>
      <div className="flex">
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out 
            ${open ? 'w-[250px]' : 'w-0'}
            bg-gradient-to-bl from-pink-700 to-purple-700 h-screen
          `}
        >
          <div className="px-6">
            <div className="pt-5">
              <img src="/img/logo.png" alt="" />
            </div>
            <Divider />

            <ul>
              <li className=" text-white rounded-2xl mb-3.5">
                <div className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl">
                  <FiGrid />
                  <Link href="/dashboard">Dashboard</Link>
                </div>
              </li>
              <li className=" text-white rounded-2xl mb-3.5">
                <div className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl">
                  <FiClipboard />
                  <Link href="/promocoes">Promoções</Link>
                </div>
              </li>
              <li className=" text-white rounded-2xl  mb-3.5">
                <div className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl">
                  <FiSettings />
                  <span>Configuração</span>
                </div>
                <ul className="ml-3.5">
                  <li>
                    <div className="flex items-center px-5 py-1 gap-2 rounded-2xl hover:font-bold">
                      <BsDot />
                      <Link href="/configuracoes/usuarios">Usuários</Link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full px-6 py-2 shadow-md flex justify-between items-center">
            <Button text onClick={() => setOpen(!open)}>
              <FiMenu className="text-2xl" />
            </Button>
            <Button severity="secondary" text>
              <span onClick={handleLogout} className="cursor-pointer">
                Sair
              </span>
            </Button>
          </div>
          <div className="px-6 pb-6 mt-8">
            <Card className="shadow-md">{children}</Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuNav;
