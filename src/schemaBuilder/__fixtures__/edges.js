import { multiplicity as m } from '../../schema/multiplicity';
import { FollowedProperty } from './properties';

export const TweetedEdge = {
  name: 'tweeted',
  multiplicity: m.ManyToOne,
  directed: true
};

export const AuthorEdge = {
  name: 'author',
  multiplicity: m.OneToMany,
  directed: true
};

export const FollowsEdge = {
  name: 'follows',
  multiplicity: m.Multi,
  directed: true,
  properties: [
    FollowedProperty
  ]
};
