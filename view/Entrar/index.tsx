'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Password } from 'primereact/password';
import './styes.css';
const LoginPage = () => {
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  return (
    <section className="flex justify-center items-center bg-linear-to-bl h-[100vh] from-pink-700 to-purple-700">
      <div className="flex flex-column align-items-center justify-content-center flex-col px-5">
        <img
          src="/img/logo.png"
          alt="logo"
          className="max-h-24 object-contain mb-5"
        />
        <Card>
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: '53px' }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Bem vindo
              </div>
              <span className="text-600 font-medium">
                Faça login para continuar
              </span>
            </div>

            <div>
              <label
                htmlFor="email1"
                className="block text-900 text-xl font-medium mb-2"
              >
                E-mail
                <InputText
                  id="email1"
                  type="text"
                  placeholder="Email address"
                  className="w-full md:w-30rem mb-5"
                />
              </label>
              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Senha
                <Password
                  id="email1"
                  type="password"
                  className="w-full md:w-30rem mb-5"
                  feedback={false}
                  toggleMask
                />
              </label>
              <div className="flex align-items-center justify-content-between my-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked ?? false)}
                    className="mr-2"
                  ></Checkbox>
                  <label htmlFor="rememberme1">Lembrar senha</label>
                </div>
              </div>
              <Button
                label="Acessar"
                className="w-full p-3 text-xl"
                onClick={() => router.push('/dashboard')}
              ></Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default LoginPage;
