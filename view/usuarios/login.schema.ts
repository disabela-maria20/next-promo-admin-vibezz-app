import { z } from 'zod';

export const UserSchema = z.object({
  email: z.string().nonempty('O e-mail é obrigatório').email({
    message: 'Formato de e-mail inválido',
    pattern: z.regexes.html5Email,
  }),
  password: z
    .string()
    .nonempty('A senha é obrigatória')
    .min(5, 'A senha deve ter no mínimo 6 caracteres')
    .max(12, 'A senha deve ter no máximo 50 caracteres')
    .optional(),
  name: z
    .string()
    .nonempty('O nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(50, 'O nome deve ter no máximo 50 caracteres'),
  permissions: z.string().nonempty('As permissões são obrigatórias'),
});

export type UserSchemaType = z.infer<typeof UserSchema> & {
  id?: string;
};
