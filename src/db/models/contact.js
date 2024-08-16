import { model, Schema } from 'mongoose';
import { CONTACT_TYPES } from '../../constants/index.js';

const contactsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: [CONTACT_TYPES.WORK, CONTACT_TYPES.HOME, CONTACT_TYPES.PERSONAL],
      default: CONTACT_TYPES.PERSONAL,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ContactsCollection = model('contacts', contactsSchema);
