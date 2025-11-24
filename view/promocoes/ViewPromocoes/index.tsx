'use client';

import { useFormatDate } from '@/hook/useFormatDate';
import { findPromotion } from '@/services/api/promotion';
import { Promotion } from '@/types/Promotion';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import React from 'react';

interface ViewPromocoesProps {
  slug: string;
}

const ViewPromocoes: React.FC<ViewPromocoesProps> = ({ slug }) => {
  const id = Number(slug);

  const { isPending, data, error } = useQuery<Promotion>({
    queryKey: ['findPromotion', id],
    queryFn: () => findPromotion(id),
    enabled: !!id,
  });

  // ✅ Hooks SEMPRE no topo
  const createdAtFormatted = useFormatDate(data?.created_at);
  const startDateFormatted = useFormatDate(data?.start_date);
  const endDateFormatted = useFormatDate(data?.end_date);

  if (!data || isPending) return <ProgressSpinner />;

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div>
          <h1 className="text-3xl font-semibold">
            Promoção: <span className="font-extrabold">#{data.id}</span>
          </h1>
          <p>Data da criação: {createdAtFormatted}</p>
        </div>
        <div>
          <Button>Realizar sorteio</Button>
        </div>
      </div>
      <form>
        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="nome">Nome</label>
          <InputText id="nome" defaultValue={data.name} disabled />
        </div>

        <div className="flex flex-col gap-2 mb-5">
          <label htmlFor="description">Descrição</label>
          <InputTextarea
            id="description"
            defaultValue={data.description}
            disabled
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="start_date">Data Inicial</label>
            <InputText
              id="start_date"
              defaultValue={startDateFormatted}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2 mb-5">
            <label htmlFor="end_date">Data Final</label>
            <InputText id="end_date" defaultValue={endDateFormatted} disabled />
          </div>

          <div className="flex align-items-center mb-5">
            <Checkbox
              inputId="sorteio"
              value="Sim"
              disabled
              checked={data.draw_completed === 1}
            />
            <label htmlFor="sorteio" className="ml-2">
              Sorteio realizado
            </label>
          </div>
        </div>
        <div>
          <label className="mb-4 block">
            Regulamentos e arquivos adicionais
          </label>
          <FileUpload
            name="demo[]"
            url={'/api/upload'}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Arraste arquivos aqui para upload.</p>
            }
          />
        </div>
      </form>
    </>
  );
};

export default ViewPromocoes;
