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
    .toEqual([
      {
        directed: true,
        multiplicity: 'MANY2ONE',
        name: 'tweeted'
      }
    ]);
  });

  it('should take in an edge and extract its indexes and label', () => {
    expect(flattenEdges([FollowsEdge]))
    .toEqual([
      {
        directed: true,
        multiplicity: 'MULTI',
        name: 'follows'
      }
    ]);
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
