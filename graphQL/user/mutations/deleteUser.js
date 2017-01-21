import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const deleteUser = {
    type: new GraphQLObjectType({
      name: 'DeleteUserResult',
      fields: () => ({
        errors: { type: app.graphs.errors.type },
        user: { type: app.graphs.user.type },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: app.services.user.deleteUserResolve,
  };

  return deleteUser;
}
