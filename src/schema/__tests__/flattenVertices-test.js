import { flattenVertices } from '../flatten';
import { UserVertex, TweetVertex } from '../__fixtures__/vertices';

describe('#flattenVertices', () => {
  it('should generate a label for a vertex', () => {
    const vertex = {
      name: 'foo'
    };

    expect(flattenVertices([vertex]))
      .toEqual({
        vertexLabels: [
          {
            name: 'foo'
          }
        ],
        vertexIndexes: [],
        propertyKeys: []
      });
  });

  it('should collect property keys and labels for a vertex', () => {
    console.log(JSON.stringify(flattenVertices([UserVertex]), null, 2));
  });
});
