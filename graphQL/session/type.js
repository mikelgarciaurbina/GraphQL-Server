import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default function(app) {
  const Session = new GraphQLObjectType({
    name: 'Session',
    description: 'This represents a Session',
    fields: () => ({
      created_at: {
        type: GraphQLString,
      },
      id: {
        type: GraphQLString,
      },
      token: {
        type: GraphQLString,
      },
      user: {
        type: app.graphs.user.type,
        resolve(session) {
          return session.getUser();
        },
      },
    }),
  });

  return Session;
}
