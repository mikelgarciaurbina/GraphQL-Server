function ServiceFactory({ models }) {
  return function querySessionResolve(parent, args) {
    return models.session.findOne({ where: args });
  };
}

export default ServiceFactory;
