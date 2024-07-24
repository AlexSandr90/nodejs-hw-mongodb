import { getContactById } from '../services/contacts.js';

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    res.status(200).json({
      message: `Successfully found contact with id ${contactId}`,
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Contact not found',
      error: error.message,
    });
  }
};
