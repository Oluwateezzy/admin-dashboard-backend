import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'prod', 'test'),
  PORT: Joi.number().default(3000),

  JWT_EXPIRES_IN: Joi.string().default('1d'),
  REFRESH_TOKEN_AGE: Joi.string().default('7d'),
  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),
  RANDOM_TOKEN_LENGTH: Joi.number().default(8),

  ENCRYPTOR_SECRET_KEY: Joi.string().required(),
});
