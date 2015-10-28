/**
 * Basic types supported by Titan.
 *
 * See: http://s3.thinkaurelius.com/docs/titan/0.9.0-M2/schema.html
 */
const types = {

  /**
   * Character sequence
   *
   * @type {String}
   */
  string: 'String',

  /**
   * Individual character
   *
   * @type {String}
   */
  character: 'Character',

  /**
   * true or false
   *
   * @type {String}
   */
  boolean: 'Boolean',

  /**
   * byte value
   *
   * @type {String}
   */
  byte: 'Byte',

  /**
   * short value
   *
   * @type {String}
   */
  short: 'Short',

  /**
   * integer value
   *
   * @type {String}
   */
  integer: 'Integer',

  /**
   * long value
   *
   * @type {String}
   */
  long: 'Long',

  /**
   * 4 byte floating point number
   *
   * @type {String}
   */
  float: 'Float',

  /**
   * 8 byte floating point number
   *
   * @type {String}
   */
  double: 'Double',

  /**
   * Number with 3 decimal digits
   *
   * @type {String}
   */
  decimal: 'Decimal',

  /**
   * Number with 6 decimal digits
   *
   * @type {String}
   */
  precision: 'Precision',

  /**
   * Date
   *
   * @type {String}
   */
  date: 'Date',

  /**
   * Geographic shape like point, circle or box
   *
   * @type {String}
   */
  geoshape: 'Geoshape',

  /**
   * UUID
   *
   * @type {String}
   */
  UUID: 'UUID'
};

export { types };