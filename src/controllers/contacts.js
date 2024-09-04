import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContactById,
  updateContactById,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import * as fs from 'node:fs/promises';
import { env } from '../utils/env.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });

  if (!contacts) {
    return next(createHttpError(404, 'Failed to get contacts'));
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  if (contact.userId.toString() !== req.user._id.toString()) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;
  const userId = req.user._id;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contact = await createContact({
    ...req.body,
    userId,
    contactId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await deleteContactById(contactId, userId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;
  const userId = req.user._id;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContactById(
    contactId,
    userId,
    { ...req.body, photo: photoUrl },
    {
      upsert: true,
    }
  );

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully updated a contact',
    data: result.contact,
  });
};

export const patchContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  let photoUrl;
  const userId = req.user._id;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContactById(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });

  if (!result) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
