import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/index.js';

const nameStringLengthMessages = {
  'string.base': 'Name should be a string',
  'string.min': 'Name should be at least {#limit}',
  'string.max': 'Name should be at most {#limit}',
  'any.required': 'Name should be exists',
};

export const createContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(nameStringLengthMessages),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(
    CONTACT_TYPES.WORK,
    CONTACT_TYPES.HOME,
    CONTACT_TYPES.PERSONAL
  ),
});

export const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages(nameStringLengthMessages),
  phoneNumber: Joi.string().min(10).max(13).required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(
    CONTACT_TYPES.WORK,
    CONTACT_TYPES.HOME,
    CONTACT_TYPES.PERSONAL
  ),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages(nameStringLengthMessages),
  phoneNumber: Joi.string().min(10).max(13),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(
    CONTACT_TYPES.WORK,
    CONTACT_TYPES.HOME,
    CONTACT_TYPES.PERSONAL
  ),
});
