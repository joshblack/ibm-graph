import { dataTypes as t } from '../../schema/dataTypes';
import { cardinality as c } from '../../schema/cardinality';

export const NameProperty = {
  name: 'name',
  dataType: t.String,
  cardinality: c.Single,
  index: {
    name: 'nameIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};

export const TextProperty = {
  name: 'text',
  dataType: t.String,
  cardinality: c.Single,
  index: {
    name: 'textIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};

export const TimeProperty = {
  name: 'time',
  dataType: t.Integer,
  cardinality: c.Single
};

export const FollowedProperty = {
  name: 'followed',
  dataType: t.Integer,
  cardinality: c.Single,
  index: {
    name: 'followedIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};
