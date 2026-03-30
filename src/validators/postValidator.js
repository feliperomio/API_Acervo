import Joi from 'joi';

export const postSchema = Joi.object({
  titulo: Joi.string().trim().min(3).required(),
  autor: Joi.string().trim().min(3).required(),
  conteudo: Joi.string().trim().min(3).required(),
  categoria: Joi.string().trim().allow('')
});

export const postUpdateSchema = Joi.object({
  titulo: Joi.string().trim().min(3),
  autor: Joi.string().trim().min(3),
  conteudo: Joi.string().trim().min(3),
  categoria: Joi.string().trim().allow('')
}).min(1);
