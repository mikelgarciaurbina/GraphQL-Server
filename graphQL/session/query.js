export default function(app) {
  const sessionQuery = {
    type: app.graphs.session.type,
    resolve: app.services.session.querySessionResolve,
  };

  return sessionQuery;
}
