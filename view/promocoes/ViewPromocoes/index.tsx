'use client';

import { useFormatDate } from '@/hook/useFormatDate';
import { isPdf, useImg, useLink } from '@/hook/useUtil';
import { findPromotion } from '@/services/api/promotion';
import { Promotion } from '@/types/Promotion';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';
import { Image } from 'primereact/image';
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
  const linkTerms = useLink(data?.terms);
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
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="banner" className="mb-2 w-full block">
              Banner da promoção
            </label>
            {data.banner && <Image src={useImg(data.banner)} preview />}
          </div>
          <div>
            <label htmlFor="banner" className="mb-2 w-full block">
              Regulamento da promoção
            </label>
            {isPdf(linkTerms) ? (
              <a
                href={linkTerms}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-full"
              >
                <img src="/img/pdf_icon.png" alt="" />
              </a>
            ) : (
              <Image src={useImg(data.terms ?? undefined)} preview />
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default ViewPromocoes;
