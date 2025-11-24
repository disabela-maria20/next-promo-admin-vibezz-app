import { z } from 'zod';

const MAX_FILE_SIZE = 2_000_000; // 2MB
const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/jpg',
  'application/pdf',
];

const today = new Date();
today.setHours(0, 0, 0, 0);

export const PromoSchema = z
  .object({
    name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
    description: z
      .string()
      .min(10, 'A descrição deve ter no mínimo 10 caracteres'),

    winners_quantity: z.number().min(1, 'Deve haver pelo menos 1 prêmio'),

    start_date: z.date(),
    end_date: z.date(),

    banner: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: 'Banner deve ter no máximo 2MB',
      })
      .refine((file) => !file || ACCEPTED_TYPES.includes(file.type), {
        message: 'Banner deve ser imagem ou PDF',
      }),

    terms: z
      .instanceof(File)
      .optional()
      .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: 'Arquivo deve ter no máximo 2MB',
      })
      .refine((file) => !file || ACCEPTED_TYPES.includes(file.type), {
        message: 'Arquivo deve ser imagem ou PDF',
      }),
  })
  .refine((data) => data.start_date >= today, {
    message: 'A data inicial não pode ser menor que a data atual',
    path: ['start_date'],
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: 'A data final não pode ser menor que a data inicial',
    path: ['end_date'],
  });

export type PromoSchemaType = z.infer<typeof PromoSchema>;
