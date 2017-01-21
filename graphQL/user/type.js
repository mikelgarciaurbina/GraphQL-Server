import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function() {
  const User = new GraphQLObjectType({
    name: 'User',
    description: 'This represents a User',
    fields: () => ({
      avatar: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      id: {
        type: GraphQLString,
      },
      lastname: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      role: {
        type: GraphQLString,
      },
    }),
  });

  return User;
}
