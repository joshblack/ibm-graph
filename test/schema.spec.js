import expect from 'expect';
import schema from '../src/schema';

import {
  input as singleVertexInput,
  output as singleVertexOutput } from './fixtures/singleVertex';

import {
  input as multipleVerticesInput,
  output as multipleVerticesOutput } from './fixtures/multipleVertices';

describe('#schema', () => {
  it('should build vertex and edge labels from a single vertex', () => {
    expect(schema(singleVertexInput)).toEqual(singleVertexOutput);
  });

  it('should build vertex and edge labels from multiple vertices', () => {
    expect(schema(multipleVerticesInput)).toEqual(multipleVerticesOutput);
  });
});