import { flattenEdges } from '../flatten';
import { FollowsEdge, TweetedEdge } from '../__fixtures__/edges';

describe('#flattenEdges', () => {
  it('should require name, multiplicty, and directed to be defined', () => {
    const missingNameEdge = {
      multiplicity: 'MULTI',
      directed: true
    };

    const missingMultiEdge = {
      name: 'foo',
      directed: false
    };

    const missingDirectedEdge = {
      name: 'foo',
      multiplicity: 'MULTI'
    };

    expect(() => flattenEdges([missingNameEdge])).toThrow();
    expect(() => flattenEdges([missingMultiEdge])).toThrow();
    expect(() => flattenEdges([missingDirectedEdge])).toThrow();
  });

  it('should take in an edge and extract its label', () => {
    expect(flattenEdges([TweetedEdge]))
      .toEqual({
        edgeIndexes: [],
        edgeLabels: [
          {
            name: 'tweeted',
            multiplicity: 'MANY2ONE',
            directed: true
          }
        ]
      });
  });

  it('should take in an edge and extract its indexes and label', () => {
    expect(flattenEdges([FollowsEdge]))
      .toEqual({
        edgeIndexes: [
          {
            name: 'follwedIndex',
            unique: false,
            composite: true,
            indexOnly: false
          }
        ],
        edgeLabels: [
          {
            name: 'follows',
            multiplicity: 'Multi',
            directed: true
          }
        ]
      });
  });

  // it('should extract indexes and labels from multiple input edges', () => {
    // expect(flattenEdges([AuthorEdge, TweetedEdge]))
      // .toEqual({
        // edgeIndexes: [
          // {
            // name: 'authorIndex',
            // unique: false,
            // composite: true,
            // indexOnly: false
          // }
        // ],
        // edgeLabels: [
          // {
            // name: 'author',
            // multiplicity: 'ONE2MANY',
            // directed: true
          // },
          // {
            // name: 'tweeted',
            // multiplicity: 'MANY2ONE',
            // directed: true
          // }
        // ]
      // });
  // });
});
