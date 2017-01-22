import { verifyToken } from '../../utils';

function ServiceFactory() {
  return async function auth(token) {
    return verifyToken(token);
  };
}

export default ServiceFactory;
