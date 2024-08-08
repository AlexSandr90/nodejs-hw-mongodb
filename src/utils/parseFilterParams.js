const parseContactType = contactType => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = contactType =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

const parseNumber = number => {
  const isString = typeof number === 'string';
  if (!isString) return;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return;
  }

  return parseNumber;
};

export const parseFilterParams = query => {
  const { contactType, maxAge, minAge } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedMaxAge = parseNumber(maxAge);
  const parsedMinAge = parseNumber(minAge);

  return {
    contactType: parsedContactType,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
  };
};
