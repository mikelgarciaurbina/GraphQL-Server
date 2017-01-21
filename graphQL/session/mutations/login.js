import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const login = {
    type: new GraphQLObjectType({
      name: 'LoginResult',
      fields: () => ({
        errors: { type: app.graphs.errors.type },
        session: { type: app.graphs.session.type },
      }),
    }),
    args: {
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: app.services.session.loginResolve,
  };

  return login;
}
