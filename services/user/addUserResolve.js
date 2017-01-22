import bcrypt from 'bcrypt-nodejs';

function ServiceFactory({ models }) {
  return async function addUserResolve(parent, args) {
    let user;

    user = await models.user.findOne({ where: { email: args.email } });

    if (user) {
      return { user: null, errors: [{ code: 102, message: 'User with this email exists.' }] };
    }

    if (!['admin', 'editor', 'viewer'].includes(args.role)) {
      return { user: null, errors: [{ code: 102, message: 'Role not permitted.' }] };
    }

    user = await models.user.create({
      email: args.email,
      lastname: args.lastname,
      name: args.name,
      password: bcrypt.hashSync(args.password),
      role: args.role,
    });

    return { user, errors: [] };
  };
}

export default ServiceFactory;
