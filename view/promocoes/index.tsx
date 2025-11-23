'use client';

import { useFormatDate } from '@/hook/useFormatDate';
import { listPromotion } from '@/services/api/promotion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import React from 'react';
import { FiEye } from 'react-icons/fi';

const Promocoes = () => {
  const { isPending, data } = useQuery({
    queryKey: ['promotion'],
    queryFn: listPromotion,
  });

  if (isPending) return <ProgressSpinner />;
  return (
    <>
      <DataTable value={data} paginator rows={10} size="small">
        <Column field="id" header="id" />
        <Column field="name" header="Nome" />
        <Column
          header="Início"
          body={(rowData) => useFormatDate(rowData.start_date)}
        />
        <Column
          header="Final"
          body={(rowData) => useFormatDate(rowData.end_date)}
        />
        <Column
          header="Status"
          body={(rowData) =>
            rowData.draw_completed === 1 ? (
              <Tag severity="success" value="Finalizado" rounded />
            ) : (
              <Tag severity="danger" value="Não finalizado" rounded />
            )
          }
        />
        <Column
          header="Ver"
          body={(rowData) => (
            <Link href={`/promocoes/${rowData.id}`}>
              <FiEye />
            </Link>
          )}
        />
      </DataTable>
    </>
  );
};

export default Promocoes;
