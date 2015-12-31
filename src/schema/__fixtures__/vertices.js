import { AuthorEdge, FollowsEdge, TweetedEdge } from './edges';
import { NameProperty, TextProperty, TimeProperty } from './properties';

export const UserVertex = {
  name: 'user',
  properties: [
    NameProperty
  ],
  inEdges: [
    AuthorEdge,
    FollowsEdge
  ],
  outEdges: [
    TweetedEdge,
    FollowsEdge
  ]
};

export const TweetVertex = {
  name: 'tweet',
  properties: [
    TextProperty,
    TimeProperty
  ],
  inEdges: [
    TweetedEdge
  ],
  outEdges: [
    AuthorEdge
  ]
};
