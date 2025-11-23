import { z } from 'zod';

export const PromoSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  permission: z.string().nonempty('Permissão é obrigatória'),
});

export type PromoSchemaType = z.infer<typeof PromoSchema> & {
  id?: string;
};
