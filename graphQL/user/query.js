import {
  GraphQLString,
} from 'graphql';

export default function(app) {
  const userQuery = {
    type: app.graphs.user.type,
    args: {
      email: {
        type: GraphQLString,
      },
      id: {
        type: GraphQLString,
      },
    },
    resolve: app.services.user.queryUserResolve,
  };

  return userQuery;
}
