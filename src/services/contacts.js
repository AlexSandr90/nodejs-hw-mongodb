import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  contactsQuery.where('userId').equals(userId);

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async contactId => {
  const contact = await ContactsCollection.findOne({ _id: contactId });
  return contact;
};

export const createContact = async contactData => {
  const contact = await ContactsCollection.create(contactData);
  return contact;
};

export const deleteContactById = async contactId => {
  return await ContactsCollection.findOneAndDelete({ _id: contactId });
};

export const updateContactById = async (contactId, payload, options = {}) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!updatedContact || !updatedContact.value) return null;

  return {
    contact: updatedContact.value,
    isNew: Boolean(updatedContact?.lastErrorObject?.upserted),
  };
};
