function ServiceFactory({ models }) {
  return function queryUserResolve(parent, args) {
    return models.user.findOne({ where: args });
  };
}

export default ServiceFactory;
