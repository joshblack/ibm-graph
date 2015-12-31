import { dataTypes as t } from '../dataTypes';

export const NameProperty = {
  name: 'name',
  type: t.String,
  index: {
    name: 'nameIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};

export const TextProperty = {
  name: 'text',
  type: t.string,
  index: {
    name: 'textIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};

export const TimeProperty = {
  name: 'time',
  type: t.Date,
  index: {
    name: 'timeIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};
