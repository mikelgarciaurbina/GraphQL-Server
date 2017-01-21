import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function() {
  const errors = new GraphQLList(new GraphQLObjectType({
    name: 'Errors',
    description: 'This represents an Error List',
    fields: () => ({
      code: {
        type: GraphQLInt,
      },
      message: {
        type: GraphQLString,
      },
    }),
  }));

  return errors;
}
