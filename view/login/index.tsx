// Login.tsx
'use client';

import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import './styes.css';
import { LoginSchema, LoginSchemaType } from './login.schema';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '@/services/api/auth';
import { AxiosError } from 'axios';
import { Toast } from 'primereact/toast';
import { login } from '@/redux/store/auth/actions';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [checked, setChecked] = useState(false);
  const toast = useRef<Toast>(null);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: LoginSchemaType) => {
      return postLogin(formData);
    },
    onSuccess: (response) => {
      const { token, user } = response;
      dispatch(login(token, user));
      router.push('/dashboard');
    },
    onError: (err: AxiosError) => {
      if (!toast.current) return;
      toast.current.clear();
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail:
          (err.response?.data as { message?: string })?.message || err.message,
        sticky: true,
      });
    },
  });

  return (
    <section className="flex justify-center items-center bg-linear-to-bl h-[100vh] from-pink-700 to-purple-700">
      <div className="flex flex-column align-items-center justify-content-center flex-col px-5">
        <img
          src="/img/logo.png"
          alt="logo"
          className="max-h-24 object-contain mb-5"
        />
        <div className="w-full bg-white md:max-w-[350px] shadow-2xl rounded-3xl">
          <div
            className="w-full surface-card py-8 px-5 sm:px-8"
            style={{ borderRadius: '53px' }}
          >
            <div className="text-center mb-5">
              <div className="text-900 text-3xl font-medium mb-3">
                Bem-vindo
              </div>
              <span className="text-600 font-medium">
                Faça login para continuar
              </span>
            </div>

            <form
              className="p-fluid"
              onSubmit={handleSubmit((formData) => mutate(formData))}
            >
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
                  {...register('email')}
                />
                {errors.email && (
                  <small className="text-red-900 text-xs">
                    {errors.email.message}
                  </small>
                )}
              </label>

              <label
                htmlFor="password1"
                className="block text-900 font-medium text-xl mb-2"
              >
                Senha
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Password
                      id="password1"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full md:w-30rem mb-5"
                      feedback={false}
                      toggleMask
                    />
                  )}
                />
                {errors.password && (
                  <small className="text-red-900 text-xs">
                    {errors.password.message}
                  </small>
                )}
              </label>

              <div className="flex align-items-center justify-content-between my-5 gap-5">
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="rememberme1"
                    checked={checked}
                    onChange={(e) => setChecked(e.checked ?? false)}
                    className="mr-2"
                  />
                  <label htmlFor="rememberme1">Lembrar senha</label>
                </div>
              </div>

              <Button
                label={isPending ? 'Entrando...' : 'Acessar'}
                className="w-full p-3 text-xl"
                type="submit"
                disabled={isPending}
              />

              <Toast ref={toast} />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
