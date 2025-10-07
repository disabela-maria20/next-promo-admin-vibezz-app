'use client';

import {
  createUser,
  deleteUser,
  getListUsers,
  editUser,
} from '@/services/api/auth';
import { queryClient } from '@/services/config/queryClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { UserSchema, UserSchemaType } from './login.schema';
import { useForm } from 'react-hook-form';

const Usuarios = () => {
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserSchemaType | null>(null);

  const toast = React.useRef<Toast>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getListUsers(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário deletado com sucesso',
        sticky: true,
      });
    },
    onError: (err: AxiosError) => {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: (err.response?.data as any)?.message || err.message,
        sticky: true,
      });
    },
  });

  const createMutation = useMutation<
    UserSchemaType,
    AxiosError,
    UserSchemaType
  >({
    mutationFn: (data) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário criado com sucesso',
        sticky: true,
      });
      setVisible(false);
    },
    onError: (err: AxiosError) => {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: (err.response?.data as any)?.message || err.message,
        sticky: true,
      });
    },
  });

  const updateMutation = useMutation<
    UserSchemaType,
    AxiosError,
    UserSchemaType
  >({
    mutationFn: (data) => editUser(data.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário atualizado com sucesso',
        sticky: true,
      });
      setVisible(false);
      setEditingUser(null);
    },
    onError: (err: AxiosError) => {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: (err.response?.data as any)?.message || err.message,
        sticky: true,
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      permission: '',
    },
  });

  const openEditModal = (user: UserSchemaType) => {
    setEditingUser(user);
    reset(user); // preenche o formulário com os dados do usuário
    setVisible(true);
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className="flex gap-2">
        <Button severity="info" text onClick={() => openEditModal(rowData)}>
          <FiEdit />
        </Button>
        <Button
          severity="danger"
          text
          onClick={() => deleteMutation.mutate(rowData.id)}
          disabled={deleteMutation.isPending}
        >
          <FiTrash />
          {deleteMutation.isPending && (
            <ProgressSpinner style={{ width: '20px', height: '20px' }} />
          )}
        </Button>
      </div>
    );
  };

  if (isPending)
    return (
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    );
  if (error) return <p>❌ Erro ao carregar usuários</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Button
          onClick={() => {
            reset();
            setEditingUser(null);
            setVisible(true);
          }}
        >
          Adicionar Usuário
        </Button>
      </div>

      <Divider />
      <DataTable
        value={data}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}
        size="small"
      >
        <Column field="name" header="Nome" />
        <Column field="email" header="E-mail" />
        <Column field="permissions" header="Permissões" />
        <Column header="Ações" body={actionBodyTemplate} />
      </DataTable>

      <Toast ref={toast} />

      <Dialog
        header={editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
        visible={visible}
        style={{ width: '50vw' }}
        onHide={() => setVisible(false)}
      >
        <form
          onSubmit={handleSubmit((formData) => {
            if (editingUser) {
              updateMutation.mutate({ ...editingUser, ...formData });
            } else {
              createMutation.mutate(formData);
            }
          })}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <label htmlFor="name" className="block mb-2">
              Nome
            </label>
            <InputText {...register('name')} id="name" className="w-full" />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-2">
              E-mail
            </label>
            <InputText {...register('email')} id="email" className="w-full" />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="senha" className="block mb-2">
              Senha
            </label>
            <InputText
              {...register('password')}
              id="senha"
              type="password"
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="permissions" className="block mb-2">
              Permissão
            </label>
            <InputText
              {...register('permission')}
              id="permissions"
              className="w-full"
            />
            {errors.permission && (
              <p className="text-red-600 text-sm mt-1">
                {errors.permission.message}
              </p>
            )}
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <Button
              type="button"
              onClick={() => setVisible(false)}
              severity="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" severity="success">
              {editingUser ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Usuarios;
