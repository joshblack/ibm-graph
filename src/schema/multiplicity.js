/**
 * The multiplicity of an edge label defines a multiplicity constraint on all
 * edges of this label, that is, a maximum number of edges between pairs of
 * vertices.
 *
 * See: http://s3.thinkaurelius.com/docs/titan/1.0.0/schema.html
 *
 * @flow
 */
export type MultiplicityType = 'MULTI'
  | 'SIMPLE'
  | 'MANY2ONE'
  | 'ONE2MANY'
  | 'ONE2ONE';

const multiplicity = {

  /**
   * Allows multiple edges of the same label between any pair of vertices. In
   * other words, the graph is a multi graph with respect to such edge label.
   * There is no constraint on edge multiplicity.
   *
   * @type {String}
   */
  Multi: 'MULTI',

  /**
   * Allows at most one edge of such label between any pair of vertices. In
   * other words, the graph is a simple graph with respect to the label.
   * Ensures that edges are unique for a given label and pairs of vertices.
   *
   * @type {String}
   */
  Simple: 'SIMPLE',

  /**
   * Allows at most one outgoing edge of such label on any vertex in the graph
   * but places no constraint on incoming edges. The edge label mother is an
   * example with MANY2ONE multiplicity since each person has at most one mother
   * but mothers can have multiple children.
   *
   * @type {String}
   */
  ManyToOne: 'MANY2ONE',

  /**
   * Allows at most one incoming edge of such label on any vertex in the graph
   * but places no constraint on outgoing edges. The edge label winnerOf is an
   * example with ONE2MANY multiplicity since each contest is won by at most one
   * person but a person can win multiple contests.
   *
   * @type {String}
   */
  OneToMany: 'ONE2MANY',

  /**
   * Allows at most one incoming and one outgoing edge of such label on any
   * vertex in the graph. The edge label marriedTo is an example with ONE2ONE
   * multiplicity since a person is married to exactly one other person.
   *
   * @type {String}
   */
  OneToOne: 'ONE2ONE'
};

export { multiplicity };
