'use client';

import { useFormatDate } from '@/hook/useFormatDate';
import {
  createPromotion,
  listFieldsPromotion,
  listPromotion,
} from '@/services/api/promotion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Tag } from 'primereact/tag';
import React, { useState, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiEye } from 'react-icons/fi';
import { PromoSchema, PromoSchemaType } from './promocoes.schema';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { queryClient } from '@/services/config/queryClient';
import { Field } from '@/types/Promotion';
import { MultiSelect } from 'primereact/multiselect';

const Promocoes = () => {
  const [visible, setVisible] = useState(false);
  const [selectedCities, setSelectedCities] = useState(null);

  const toast = useRef<Toast>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const { isPending, data } = useQuery({
    queryKey: ['promotion'],
    queryFn: listPromotion,
  });

  const fields = useQuery<Field>({
    queryKey: ['listFieldsPromotion'],
    queryFn: listFieldsPromotion,
  });

  console.log(fields.data);

  const createPromo = useMutation<PromoSchemaType, Error, PromoSchemaType>({
    mutationFn: (data: PromoSchemaType) => createPromotion(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotion'] });
      toast.current?.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Promoção criada com sucesso',
        life: 3000,
      });
      setVisible(false);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PromoSchemaType>({
    resolver: zodResolver(PromoSchema),
    defaultValues: {
      winners_quantity: 1,
      start_date: new Date(),
      end_date: new Date(),
      banner: undefined,
      terms: undefined,
    },
  });

  const onSubmit = (data: PromoSchemaType) => {
    const promoData = {
      name: data.name,
      description: data.description,
      winners_quantity: data.winners_quantity,
      start_date: data.start_date,
      end_date: data.end_date,
      banner: data.banner,
      terms: data.terms,
      created_by_user: user?.id,
    };

    createPromo.mutate(promoData);
  };

  const onError = (errors: any) => {
    console.log('❌ ERROS DE VALIDAÇÃO:', errors);
    toast.current?.show({
      severity: 'error',
      summary: 'Erro de Validação',
      detail: 'Verifique os campos obrigatórios',
      life: 3000,
    });
  };

  if (isPending) return <ProgressSpinner />;

  return (
    <>
      <Toast ref={toast} />

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-semibold">Promoções</h1>
        <Button onClick={() => setVisible(true)}>Adicionar</Button>
      </div>

      <DataTable value={data} paginator rows={10} size="small">
        <Column field="id" header="ID" />
        <Column field="name" header="Nome" />
        <Column header="Início" body={(row) => useFormatDate(row.start_date)} />
        <Column header="Final" body={(row) => useFormatDate(row.end_date)} />
        <Column
          header="Status"
          body={(row) =>
            row.draw_completed === 1 ? (
              <Tag severity="success" value="Finalizado" rounded />
            ) : (
              <Tag severity="danger" value="Não finalizado" rounded />
            )
          }
        />
        <Column
          header="Ver"
          body={(row) => (
            <Link href={`/promocoes/${row.id}`}>
              <FiEye />
            </Link>
          )}
        />
      </DataTable>

      <Dialog
        header="Adicionar promoção"
        visible={visible}
        style={{ width: '50vw' }}
        modal
        appendTo="self"
        onHide={() => setVisible(false)}
      >
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <label>Nome</label>
            <InputText {...register('name')} />
            {errors.name && (
              <small className="text-red-500">{errors.name.message}</small>
            )}
          </div>

          <div className="flex flex-col">
            <label>Descrição</label>
            <InputTextarea {...register('description')} />
            {errors.description && (
              <small className="text-red-500">
                {errors.description.message}
              </small>
            )}
          </div>

          <div className="flex flex-col">
            <label>Quantidade de Ganhadores</label>
            <Controller
              name="winners_quantity"
              control={control}
              render={({ field }) => (
                <InputNumber
                  value={field.value}
                  onValueChange={(e) => field.onChange(e.value)}
                  min={1}
                />
              )}
            />
            {errors.winners_quantity && (
              <small className="text-red-500">
                {errors.winners_quantity.message}
              </small>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label>Data Início</label>
              <Controller
                name="start_date"
                control={control}
                render={({ field }) => (
                  <Calendar
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    showIcon
                    dateFormat="dd/mm/yy"
                  />
                )}
              />
              {errors.start_date && (
                <small className="text-red-500">
                  {errors.start_date.message}
                </small>
              )}
            </div>

            <div className="flex flex-col">
              <label>Data Final</label>
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
                  <Calendar
                    value={field.value}
                    onChange={(e) => field.onChange(e.value)}
                    showIcon
                    dateFormat="dd/mm/yy"
                  />
                )}
              />
              {errors.end_date && (
                <small className="text-red-500">
                  {errors.end_date.message}
                </small>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* BANNER */}
            <div className="flex flex-col">
              <label>Banner</label>
              <Controller
                name="banner"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    mode="basic"
                    name="banner"
                    chooseLabel="Selecionar Banner"
                    accept="image/*, application/pdf"
                    customUpload
                    auto={false}
                    onSelect={(e) => field.onChange(e.files[0])}
                  />
                )}
              />
              {/* {watch('banner_base64') && (
                <small className="text-green-600">Banner carregado ✅</small>
              )} */}
              {errors.banner && (
                <small className="text-red-500">{errors.banner.message}</small>
              )}
            </div>

            {/* PDF */}
            <div className="flex flex-col">
              <label>Regulamento (PDF)</label>
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <FileUpload
                    mode="basic"
                    name="terms"
                    chooseLabel="Selecionar Regulamento"
                    accept="image/*, application/pdf"
                    customUpload
                    auto={false}
                    onSelect={(e) => {
                      field.onChange(e.files[0]);
                    }}
                  />
                )}
              />

              {/* {watch('terms_pdf_base64') && (
                <small className="text-green-600">PDF carregado ✅</small>
              )} */}
              {errors.terms && (
                <small className="text-red-500">{errors.terms.message}</small>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Campos do fomulario</label>
            <MultiSelect
              value={selectedCities}
              onChange={(e) => setSelectedCities(e.value)}
              options={
                Array.isArray(fields.data)
                  ? fields.data.map(
                      (field: { name: string; field_name: string }) => ({
                        label: field.name,
                        value: field.field_name,
                      })
                    )
                  : []
              }
              placeholder="Selecione os campos"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              label="Cancelar"
              severity="secondary"
              onClick={() => setVisible(false)}
            />
            <Button
              type="submit"
              label="Salvar"
              loading={createPromo.isPending}
            />
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default Promocoes;
