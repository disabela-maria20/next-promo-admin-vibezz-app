'use client';

import { getListUsers } from '@/services/api/auth';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Divider } from 'primereact/divider';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

const Usuarios = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => getListUsers(),
  });

  const actionBodyTemplate = (rowData: any) => {
    console.log('Renderizando ações para:', rowData);
    return (
      <div className="flex gap-2">
        <Button
          severity="info"
          text
          onClick={() => console.log('Editar', rowData)}
        >
          <FiEdit />
        </Button>
        <Button
          severity="danger"
          text
          onClick={() => console.log('Excluir', rowData)}
        >
          <FiTrash />
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

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Button>Adicionar Usuário</Button>
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
        <Column field="name" header="Nome"></Column>
        <Column field="email" header="E-mail"></Column>
        <Column field="permissions" header="Permissões"></Column>
        <Column header="" body={actionBodyTemplate}></Column>
      </DataTable>
    </div>
  );
};

export default Usuarios;
