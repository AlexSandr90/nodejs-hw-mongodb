import { getAllContacts } from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to get contacts',
      error: error.message,
    });
  }
};
