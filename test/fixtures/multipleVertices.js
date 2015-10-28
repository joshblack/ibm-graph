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
    multiplicity: m.ManyToMany // A user can wear multiple "hats"
  }, {
    label: 'previousRole',
    multiplicity: m.ManyToMany
  }]
};

const RoleVertex = {
  label: 'role',
  title: {
    type: t.string,
    cardinality: c.Single
  },
  inEdges: [{
    label: 'currentRole',
    multiplicity: m.ManyToMany
  }, {
    label: 'previousRole',
    multiplicity: m.ManyToMany
  }]
};

const input = [IntervieweeVertex, RoleVertex];

export { input };

const schema = {
  edgeIndexes: [],
  vertexIndexes: [],
  vertexLabels: [
    { name: 'interviewee' },
    { name: 'role' }
  ],
  propertyKeys: [
    {
      cardinality: 'SINGLE',
      dataType: 'String',
      name: 'name'
    },
    {
      cardinality: 'SINGLE',
      dataType: 'String',
      name: 'title'
    }
  ],
  edgeLabels: [
    {
      directed: true,
      multiplicity: 'MULTI',
      name: 'currentRole'
    },
    {
      directed: true,
      multiplicity: 'MULTI',
      name: 'previousRole'
    }
  ]
}

export { schema as output };