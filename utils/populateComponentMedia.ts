const imgComponentPopulateOptions = {
  populate: {
    s: { fields: 'url' },
    m: { fields: 'url' },
    l: { fields: 'url' },
  },
};

type ImgComponentPopulateOptions = typeof imgComponentPopulateOptions;

export const populateComponentMedia = (...fields: string[]) => {
  const populateFields: {
    [field: string]: ImgComponentPopulateOptions;
  } = {};

  fields.forEach((field) => {
    populateFields[field] = {
      populate: {
        s: { fields: 'url' },
        m: { fields: 'url' },
        l: { fields: 'url' },
      },
    };
  });

  return populateFields;
};
