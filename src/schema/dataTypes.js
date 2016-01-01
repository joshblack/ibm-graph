/**
 * Basic Data Types supported by Titan.
 *
 * See: http://s3.thinkaurelius.com/docs/titan/1.0.0/schema.html
 *
 * @flow
 */
export type DataType = 'String'
  | 'Character'
  | 'Boolean'
  | 'Byte'
  | 'Short'
  | 'Integer'
  | 'Long'
  | 'Double'
  | 'Decimal'
  | 'Precision'
  | 'Date'
  | 'Geoshape'
  | 'UUID';


const dataTypes = {

  /**
   * Character sequence
   *
   * @type {String}
   */
  'String': 'String',

  /**
   * Individual character
   *
   * @type {String}
   */
  'Character': 'Character',

  /**
   * true or false
   *
   * @type {String}
   */
  'Boolean': 'Boolean',

  /**
   * byte value
   *
   * @type {String}
   */
  'Byte': 'Byte',

  /**
   * short value
   *
   * @type {String}
   */
  'Short': 'Short',

  /**
   * integer value
   *
   * @type {String}
   */
  'Integer': 'Integer',

  /**
   * long value
   *
   * @type {String}
   */
  'Long': 'Long',

  /**
   * 4 byte floating point number
   *
   * @type {String}
   */
  'Float': 'Float',

  /**
   * 8 byte floating point number
   *
   * @type {String}
   */
  'Double': 'Double',

  /**
   * Number with 3 decimal digits
   *
   * @type {String}
   */
  'Decimal': 'Decimal',

  /**
   * Number with 6 decimal digits
   *
   * @type {String}
   */
  'Precision': 'Precision',

  /**
   * Date
   *
   * @type {String}
   */
  'Date': 'Date',

  /**
   * Geographic shape like point, circle or box
   *
   * @type {String}
   */
  'Geoshape': 'Geoshape',

  /**
   * UUID
   *
   * @type {String}
   */
  'UUID': 'UUID'
};

export { dataTypes };
