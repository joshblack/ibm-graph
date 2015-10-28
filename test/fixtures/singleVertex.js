import { types as t } from '../../src/types';
import { cardinality as c } from '../../src/cardinality';
import { multiplicity as m } from '../../src/multiplicity';

const IntervieweeVertex = {
  label: 'interviewee',
  name: {
    type: t.string,
    cardinality: c.Single
  },
  outEdges: [{
    label: 'currentRole',
    multiplicity: m.OneToOne,
  }, {
    label: 'previousRole',
    multiplicity: m.OneToMany
  }],
  inEdges: [{
    label: 'holder',
    multiplicity: m.ManyToOne
  }, {
    label: 'previousHolder',
    multiplicity: m.ManyToMany
  }]
};

const input = [IntervieweeVertex];

export { input };

const schema = {
  'edgeIndexes': [],
  'vertexIndexes': [],
  'vertexLabels': [
    {
      'name': 'interviewee'
    }
  ],
  'propertyKeys': [
    {
      'cardinality': 'SINGLE',
      'dataType': 'String',
      'name': 'name'
    }
  ],
  'edgeLabels': [
    {
      'directed': true,
      'multiplicity': 'ONE2ONE',
      'name': 'currentRole'
    },
    {
      'directed': true,
      'multiplicity': 'ONE2MANY',
      'name': 'previousRole'
    },
    {
      'directed': true,
      'multiplicity': 'MANY2ONE',
      'name': 'holder'
    },
    {
      'directed': true,
      'multiplicity': 'MULTI',
      'name': 'previousHolder'
    }
  ]
}

export { schema as output };