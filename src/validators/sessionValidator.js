import Joi from 'joi';


export const sessionSchema = Joi.object({
  mentor: Joi.string().required(),
  assunto: Joi.string().trim().required(),
  descricao: Joi.string().allow('').trim(),
  data: Joi.date().greater('now').required()
  .messages({ 'date.greater': 'A data da sessão não pode ser no passado' }),
  status: Joi.string().valid('pendente', 'aprovada', 'concluida', 'cancelada').default('pendente')
});


// O .fork() pega as chaves existentes e as torna opcionais (.optional())
export const sessionUpdateSchema = sessionSchema.fork(
  ['mentor', 'assunto', 'data'],
  (schema) => schema.optional()
).min(1);
