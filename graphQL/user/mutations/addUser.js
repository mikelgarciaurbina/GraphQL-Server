import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const addUser = {
    type: new GraphQLObjectType({
      name: 'CreateUserResult',
      fields: () => ({
        errors: { type: app.graphs.errors.type },
        user: { type: app.graphs.user.type },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastname: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
      role: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: app.services.user.addUserResolve,
  };

  return addUser;
}
