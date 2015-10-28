/**
 * Used to define the allowed cardinality of the values associated with the key
 * on any given vertex.
 *
 * See: http://s3.thinkaurelius.com/docs/titan/0.9.0-M2/schema.html
 */
const cardinality = {

  /**
   * Allows at most one value per element for such key. In other words, the
   * key→value mapping is unique for all elements in the graph. The property key
   * birthDate is an example with SINGLE cardinality since each person has
   * exactly one birth date.
   *
   * @type {String}
   */
  Single: 'SINGLE',

  /**
   * Allows an arbitrary number of values per element for such key. In other
   * words, the key is associated with a list of values allowing duplicate
   * values. Assuming we model sensors as vertices in a graph, the property key
   * sensorReading is an example with LIST cardinality to allow lots of
   * (potentially duplicate) sensor readings to be recorded.
   *
   * @type {String}
   */
  List: 'LIST',

  /**
   * Allows multiple values but no duplicate values per element for such key. In
   * other words, the key is associated with a set of values. The property key
   * name has SET cardinality if we want to capture all names of an individual
   * (including nick name, maiden name, etc).
   *
   * @type {String}
   */
  Set: 'SET'
};

export { cardinality };