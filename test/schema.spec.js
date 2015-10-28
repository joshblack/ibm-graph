import expect from 'expect';
import schema from '../src/schema';
import { input, output } from './fixtures/singleVertex';

describe('#schema', () => {
  it('should build vertex and edge labels from a single vertex', () => {
    expect(schema([input])).toEqual(output);
  });
});