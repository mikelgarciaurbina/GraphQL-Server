function ServiceFactory({ models }) {
  return function queryUserResolve(parent, args, context) {
    if (!context.user_id) {
      throw JSON.stringify({ message: 'Not Authenticated.', code: 401 });
    }
    return models.user.findOne({ where: { id: context.user_id } });
  };
}

export default ServiceFactory;
