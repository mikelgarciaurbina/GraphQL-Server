function ServiceFactory({ models }) {
  return async function updateUserResolve(parent, args) {
    const errors = [];

    const user = await models.user.findOne({ where: { email: args.email } });

    if (user === null) {
      errors.push({ code: 102, message: 'A user with this email not exists.' });
    }

    if (errors.length === 0) {
      user.destroy();
    }

    return { user, errors };
  };
}

export default ServiceFactory;
