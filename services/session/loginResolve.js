import bcrypt from 'bcrypt-nodejs';
import { createToken } from '../../utils';

function ServiceFactory({ models }) {
  return async function loginResolve(parent, args) {
    const user = await models.user.findOne({
      where: {
        email: args.email,
      },
    });

    if (user === null) {
      return { session: null, errors: [{ code: 302, message: 'User with this email and password does not exists.' }] };
    }

    if (!bcrypt.compareSync(args.password, user.password)) {
      return { session: null, errors: [{ code: 302, message: 'User with this email and password does not exists.' }] };
    }

    const session = await models.session.create({
      user_id: user.id,
    });
    session.token = createToken({ user_id: user.id, role: user.role });

    return { session, errors: [] };
  };
}
export default ServiceFactory;
