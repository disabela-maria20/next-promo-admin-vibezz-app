'use client';

import Link from 'next/link';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import React from 'react';
import { BsDot } from 'react-icons/bs';
import { FiGrid, FiMenu, FiSettings } from 'react-icons/fi';
import './style.css';
const MenuNav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <section>
      <div className="flex">
        <div className="w-[250px] flex-none bg-linear-to-bl h-[100vh] from-pink-700 to-purple-700">
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
              <li className=" text-white rounded-2xl  mb-3.5">
                <div className="flex items-center px-5 py-1 gap-2 hover:bg-white/30 rounded-2xl">
                  <FiSettings />
                  <Link href="/configuracoes">Configuração</Link>
                </div>
                <ul className="ml-3.5">
                  <li>
                    <div className="flex items-center px-5 py-1 gap-2 rounded-2xl hover:font-bold">
                      <BsDot />
                      <Link href="/dashboard/usuarios">Usuários</Link>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full px-6 py-2 shadow-md">
            <Button text>
              <FiMenu className="text-2xl" />
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
