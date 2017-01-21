import bcrypt from 'bcrypt-nodejs';

function ServiceFactory({ models }) {
  return async function addUserResolve(parent, args) {
    let user;
    const errors = [];

    user = await models.user.findOne({ where: { email: args.email } });

    if (user) {
      errors.push({ code: 102, key: 'email', message: 'User with this email exists.' });
    }

    if (!['admin', 'editor', 'viewer'].includes(args.role)) {
      errors.push({ code: 102, key: 'role', message: 'Role not permitted.' });
    }

    if (errors.length === 0) {
      user = await models.user.create({
        email: args.email,
        lastname: args.lastname,
        name: args.name,
        password: bcrypt.hashSync(args.password),
        role: args.role,
      });
    }

    return { user, errors };
  };
}

export default ServiceFactory;
