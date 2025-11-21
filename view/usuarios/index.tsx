'use client';

import {
  createUser,
  deleteUser,
  getListUsers,
  editUser,
  listPermissions,
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
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { UserSchema, UserSchemaType } from './login.schema';
import { useForm, Controller } from 'react-hook-form';

const Usuarios = () => {
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<UserSchemaType | null>(null);

  const toast = React.useRef<Toast>(null);

  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => getListUsers(),
  });

  const { data: permissions = [], isLoading: isLoadingPermissions } = useQuery<
    Array<{ name: string }>
  >({
    queryKey: ['permissions'],
    queryFn: listPermissions,
    staleTime: 1000 * 60 * 30,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
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
    reset(user);
    setVisible(true);
  };

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
  });

  const actionBodyTemplate = (rowData: any) => (
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
      </Button>
    </div>
  );

  if (isPending) return <ProgressSpinner />;
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

      <DataTable value={data} paginator rows={5} size="small">
        <Column field="name" header="Nome" />
        <Column field="email" header="E-mail" />
        <Column
          header="Permissões"
          body={(rowData) =>
            Array.isArray(rowData.permissions)
              ? rowData.permissions.join(', ')
              : rowData.permissions
          }
        />
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
          className="grid gap-4"
        >
          <div>
            <label>Nome</label>
            <InputText {...register('name')} className="w-full" />
          </div>

          <div>
            <label>Email</label>
            <InputText {...register('email')} className="w-full" />
          </div>

          <div>
            <label>Senha</label>
            <InputText
              {...register('password')}
              type="password"
              className="w-full"
            />
          </div>

          <div>
            <label>Permissão</label>
            <Controller
              name="permission"
              control={control}
              render={({ field }) => (
                <Dropdown
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                  options={permissions}
                  optionLabel="name"
                  optionValue="name"
                  placeholder="Selecione"
                  className="w-full"
                  loading={isLoadingPermissions}
                />
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={() => setVisible(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingUser ? 'Atualizar' : 'Salvar'}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default Usuarios;
