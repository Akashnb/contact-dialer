export const validationTypes = {
  REQUIRED: 'REQUIRED',
  MATCH: 'MATCH',
  INVALID: 'INVALID',
};

export default (validationType, fieldName1, fieldName2) => {
  switch (validationType) {
    case validationTypes.REQUIRED:
      return `${fieldName1} is required`;
    case validationTypes.MATCH:
      return `${fieldName1} and ${fieldName2} does not match`;
    case validationTypes.INVALID:
      return `Invalid ${fieldName1}`;
    default:
      return '';
  }
};
