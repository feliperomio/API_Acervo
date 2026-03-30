import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().trim().min(3).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('usuario', 'admin').required(),
  telefone: Joi.string().allow('').trim(),
  habilidades: Joi.array().items(Joi.string().trim())
});

export const userUpdateSchema = userSchema
  .fork(['name', 'email', 'password', 'role'], (schema) => schema.optional())
  .min(1);

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required()
});
