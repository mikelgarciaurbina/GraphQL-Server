function ServiceFactory({ models }) {
  return async function updateUserResolve(parent, args) {
    const user = await models.user.findOne({ where: { email: args.email } });

    if (!user) {
      return { user: null, errors: [{ code: 404, message: 'A user with this email not exists.' }] };
    }

    user.destroy();

    return { user, errors: [] };
  };
}

export default ServiceFactory;
