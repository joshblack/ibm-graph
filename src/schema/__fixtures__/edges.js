import { multiplicity as m } from '../multiplicity';

export const TweetedEdge = {
  name: 'tweeted',
  multiplicity: m.ManyToOne,
  directed: true
};

export const AuthorEdge = {
  name: 'author',
  multiplicity: m.OneToMany,
  directed: true,
  index: {
    name: 'authorIndex',
    unique: false,
    composite: true,
    indexOnly: false
  }
};

export const FollowsEdge = {
  name: 'follows',
  multiplicity: m.Multi,
  directed: true
};
